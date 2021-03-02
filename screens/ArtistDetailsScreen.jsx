import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { View, ScrollView, Image, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import LoadingContainer from "../components/UI/LoadingContainer";
import CustomText from "../components/UI/CustomText";
import TouchableItem from "../components/TouchableItem";
import SimilarItem from "../components/SimilarItem";
import ListItemsArtist from "../components/ListItemsArtist";
import ItemStats from "../components/ItemStats";
import DetailsTitle from "../components/DetailsTitle";

import myColors from "../constants/myColors";
import spacing from "../constants/spacing";
import {
  getArtistInfo,
  getSimilarArtists,
  getTopAlbums,
  getTopTracks,
} from "../utils/lastfm";
import useColorScheme from "../hooks/useColorSchemeFix";

const listItemSeparator = () => <View style={{ width: spacing.md }} />;

const ArtistDetailsScreen = ({ navigation, route }) => {
  const {
    artistName: artistNameFromParams,
    image: artistImageFromParams,
    topPlaycount,
  } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [artistInfo, setArtistInfo] = useState();
  const [artistTopTracks, setArtistTopTracks] = useState();
  const [artistTopAlbums, setArtistTopAlbums] = useState();
  const [similarArtists, setSimilarArtists] = useState();
  const isDarkTheme = useColorScheme() === "dark";
  const username = useSelector((state) => state.auth.username);

  const artistInfoHandler = useCallback(async () => {
    const result = await getArtistInfo(username, artistNameFromParams);
    setArtistInfo(result);
  }, []);

  const artistTopTracksHandler = useCallback(async () => {
    const result = await getTopTracks("artist", artistNameFromParams);
    setArtistTopTracks(result);
  }, []);

  const artistTopAlbumsHandler = useCallback(async () => {
    const result = await getTopAlbums("artist", artistNameFromParams);
    setArtistTopAlbums(result);
  }, []);

  const similarArtistsHandler = useCallback(async () => {
    const result = await getSimilarArtists(artistNameFromParams);
    setSimilarArtists(result);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await artistInfoHandler();
        await artistTopTracksHandler();
        await artistTopAlbumsHandler();
        await similarArtistsHandler();
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistNameFromParams}`,
    });
  }, [navigation]);

  const itemSimilarArtistHandler = async (
    artistName,
    artistImage,
    playcount
  ) => {
    console.log(artistImage);
    navigation.push("Artist Details", {
      artistName,
      image: artistImage,
      playcount,
    });
  };

  const listItemSimilarArtist = ({ item, index }) => {
    return (
      <ListItemsArtist
        onPress={() => {
          itemSimilarArtistHandler(
            item.artistName,
            item.artistImage300,
            item.playcount
          );
        }}
        image={item.artistImage300}
        title={item.artistName}
        itemsNumber={similarArtists.length}
        index={index}
      />
    );
  };

  const itemTopTracksHandler = async (
    artistName,
    trackName,
    albumArt,
    albumName
  ) => {
    navigation.push("Scrobble Details", {
      artistName,
      trackName,
      albumArt,
      albumName,
    });
  };

  const itemTopAlbumsHandler = async (artistName, albumName, albumArt) => {
    navigation.push("Album Details", {
      artistName,
      albumName,
      albumArt,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
  });

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 0,
          paddingVertical: 50,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 30,
            shadowColor: "black",
            shadowRadius: 10,
            shadowOffset: { width: 3, height: 6 },
            shadowOpacity: 0.2,
          }}
        >
          <Image
            source={{ uri: artistImageFromParams }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
        <CustomText
          size="H2"
          color={isDarkTheme ? "white" : myColors.gray_900}
          bold
          complementaryStyle={{ alignSelf: "center", marginBottom: spacing.md }}
        >
          {artistNameFromParams}
        </CustomText>

        {!isLoading ? (
          <>
            {artistInfo ? (
              <View>
                <View style={{ paddingHorizontal: spacing.md }}>
                  <ItemStats
                    playcount={artistInfo.playcount}
                    userplaycount={artistInfo.userplaycount}
                    listeners={artistInfo.listeners}
                    topPlaycount={topPlaycount}
                  />
                </View>
                {artistInfo.bio ? (
                  <View style={styles.container}>
                    <DetailsTitle>Biography</DetailsTitle>
                    <TouchableItem
                      onPress={() => {
                        navigation.navigate("Biography", {
                          biography: artistInfo.bio,
                        });
                      }}
                      style={{ marginBottom: 8 }}
                    >
                      <CustomText
                        size="H6"
                        color={isDarkTheme ? "white" : myColors.gray_900}
                        complementaryStyle={{ lineHeight: 18 }}
                        numberOfLines={6}
                      >
                        {artistInfo.bio}
                      </CustomText>
                    </TouchableItem>
                  </View>
                ) : null}
              </View>
            ) : null}

            {artistTopTracks && artistTopTracks.length !== 0 ? (
              <View style={styles.container}>
                <DetailsTitle>Top Tracks</DetailsTitle>
                {artistTopTracks.map((item) => (
                  <SimilarItem
                    title={item.trackName}
                    subtitle={item.albumName}
                    playcount={item.playcount}
                    image={item.albumArt}
                    key={item.id}
                    onPress={() => {
                      itemTopTracksHandler(
                        item.artistName,
                        item.trackName,
                        item.albumArt,
                        item.albumName
                      );
                    }}
                  />
                ))}
              </View>
            ) : null}

            {artistTopAlbums && artistTopAlbums.length !== 0 ? (
              <View style={styles.container}>
                <DetailsTitle>Top Albums</DetailsTitle>
                {artistTopAlbums.map((item) => {
                  return (
                    <SimilarItem
                      title={item.albumName}
                      subtitle={`${item.releaseYear} • ${item.totalTracks} ${item.totalTracksWord}`}
                      image={item.albumArt}
                      playcount={item.playcount}
                      key={item.id}
                      onPress={() => {
                        itemTopAlbumsHandler(
                          item.artistName,
                          item.albumName,
                          item.albumArt
                        );
                      }}
                    />
                  );
                })}
              </View>
            ) : null}

            {similarArtists && similarArtists.length !== 0 ? (
              <View
                style={{
                  flex: 1,
                  paddingVertical: spacing.sm,
                }}
              >
                <DetailsTitle
                  complementaryStyle={{ paddingLeft: spacing.md }}
                  style={{ marginLeft: 20 }}
                >
                  Similar Artists
                </DetailsTitle>
                <FlatList
                  data={similarArtists}
                  renderItem={listItemSimilarArtist}
                  horizontal
                  ItemSeparatorComponent={listItemSeparator}
                />
              </View>
            ) : null}
          </>
        ) : (
          <View style={{ padding: 40 }}>
            <LoadingContainer />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

ArtistDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ArtistDetailsScreen;
