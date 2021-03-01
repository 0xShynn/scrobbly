import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { FlatList, Image, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import DetailsHeader from "../components/DetailsHeader";
import ItemStats from "../components/ItemStats";
import TouchableItem from "../components/TouchableItem";
import DetailsTitle from "../components/DetailsTitle";
import LoadingContainer from "../components/UI/LoadingContainer";
import CustomButton from "../components/UI/CustomButton";
import CustomText from "../components/UI/CustomText";

import useColorScheme from "../hooks/useColorSchemeFix";
import myColors from "../constants/myColors";
import spacing from "../constants/spacing";
import { getAlbumInfo, getArtistInfo } from "../utils/lastfm";
import abbreviateNumber from "../utils/numbers";
import {
  getSpotifyAlbumInfo,
  getSpotifyAlbumTracklist,
} from "../utils/spotify";

const AlbumDetailsScreen = ({ navigation, route }) => {
  const { artistName, albumName, albumArt, topPlaycount } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [albumStats, setAlbumStats] = useState();
  const [spotifyAlbumInfo, setSpotifyAlbumInfo] = useState();
  const [albumTracklist, setAlbumTracklist] = useState([]);
  const [artistInfo, setArtistInfo] = useState();
  const [isACompilation, setIsACompilation] = useState(false);
  const isDarkTheme = useColorScheme() === "dark";
  const username = useSelector((state) => state.auth.username);

  const albumInfoHandler = useCallback(async () => {
    const result = await getAlbumInfo(username, artistName, albumName);
    setAlbumStats(result);
  }, []);

  const spotifyAlbumInfoHandler = useCallback(async () => {
    const result = await getSpotifyAlbumInfo(artistName, albumName);
    if (result && result.albumType === "compilation") {
      setIsACompilation(true);
    }
    setSpotifyAlbumInfo(result);
  }, []);

  const spotifyAlbumTracklistHandler = useCallback(async () => {
    const { tracklist } = await getSpotifyAlbumTracklist(artistName, albumName);
    setAlbumTracklist(tracklist);
  }, []);

  const artistInfoHandler = useCallback(async () => {
    const result = await getArtistInfo(username, artistName);
    setArtistInfo(result);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      albumInfoHandler();
      spotifyAlbumInfoHandler();
      spotifyAlbumTracklistHandler();
      artistInfoHandler();

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const itemSeparator = useCallback(
    () => (
      <View
        style={{
          height: 1,
          backgroundColor: isDarkTheme ? myColors.gray_1000 : myColors.gray_200,
        }}
      />
    ),
    [isDarkTheme]
  );

  const itemSelectTrackHandler = (artist, trackName) => {
    navigation.push("Scrobble Details", {
      artistName: artist,
      trackName,
      albumArt,
      albumName,
    });
  };

  const itemTrackList = (itemData) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
        }}
        onPress={() => {
          itemSelectTrackHandler(
            itemData.item.artistName,
            itemData.item.trackName
          );
        }}
      >
        <View
          style={{
            minWidth: 30,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <CustomText
            size={isACompilation ? "H5" : "H6"}
            color={isDarkTheme ? "white" : myColors.gray_900}
            bold
          >
            {itemData.item.trackNumber}
          </CustomText>
        </View>
        <View style={{ flex: 1 }}>
          {isACompilation && (
            <CustomText
              size="H6"
              color={isDarkTheme ? myColors.gray_300 : myColors.gray_700}
              complementaryStyle={{ marginBottom: 3 }}
            >
              {itemData.item.artistName}
            </CustomText>
          )}
          <CustomText
            size="H6"
            bold={isACompilation}
            color={isDarkTheme ? "white" : myColors.gray_900}
            numberOfLines={1}
            complementaryStyle={{ flex: 1 }}
          >
            {itemData.item.trackName}
          </CustomText>
        </View>
        <CustomText
          size="H6"
          color={myColors.gray_500}
          complementaryStyle={{ paddingLeft: 10 }}
        >
          {itemData.item.duration}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const itemSelectArtistHandler = () => {
    const { image, playcount, listeners } = artistInfo;
    navigation.navigate("Artist Details", {
      artistName,
      image,
      playcount,
      listeners,
    });
  };

  const ListHeader = () => {
    return (
      <>
        <DetailsHeader
          title={albumName}
          subtitle={isACompilation ? "Various Artists" : artistName}
          image={albumArt}
        />

        {spotifyAlbumInfo && !isLoading ? (
          <View>
            {albumStats && !isLoading ? (
              <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                <ItemStats
                  playcount={albumStats.playcount}
                  userplaycount={albumStats.userplaycount}
                  listeners={albumStats.listeners}
                  topPlaycount={topPlaycount}
                />
              </View>
            ) : null}

            {artistInfo &&
            !isLoading &&
            spotifyAlbumInfo.albumType !== "compilation" ? (
              <View
                style={{
                  paddingHorizontal: spacing.md,
                  marginBottom: spacing.xl,
                }}
              >
                <TouchableItem onPress={itemSelectArtistHandler}>
                  <Image
                    source={{ uri: artistInfo.image }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 70,
                      marginRight: 15,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <CustomText
                      size="H5"
                      color={isDarkTheme ? "white" : myColors.gray_900}
                      bold
                      complementaryStyle={{ marginBottom: 4 }}
                    >
                      {artistName}
                    </CustomText>
                    <CustomText
                      size="H6"
                      color={
                        isDarkTheme ? myColors.gray_300 : myColors.gray_600
                      }
                      numberOfLines={2}
                    >
                      {abbreviateNumber(artistInfo.playcount)} scrobbles
                    </CustomText>
                  </View>
                </TouchableItem>
              </View>
            ) : null}
            <DetailsTitle
              complementaryStyle={{
                paddingHorizontal: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: isDarkTheme
                  ? myColors.gray_1000
                  : myColors.gray_200,
                marginBottom: 0,
                paddingBottom: spacing.md,
              }}
            >
              Tracklist
            </DetailsTitle>
          </View>
        ) : null}
      </>
    );
  };

  const ListFooter = () => {
    return (
      <View
        style={{
          paddingTop: spacing.xs,
          paddingBottom: 40,
          paddingHorizontal: spacing.md,
        }}
      >
        {spotifyAlbumInfo && !isLoading ? (
          <CustomText
            size="H6"
            color={isDarkTheme ? myColors.gray_400 : myColors.gray_600}
          >
            {spotifyAlbumInfo.copyrights}
          </CustomText>
        ) : null}
      </View>
    );
  };

  const ListEmpty = () => {
    if (isLoading) {
      return (
        <View style={{ padding: 100 }}>
          <LoadingContainer />
        </View>
      );
    }

    return (
      <View
        style={{
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomText
          size="H5"
          complementaryStyle={{ textAlign: "center", marginBottom: spacing.xl }}
        >
          Tracklist not found
        </CustomText>
        <CustomButton
          label="Go Back"
          onPress={() => navigation.goBack()}
          style={{ marginVertical: spacing.md }}
        />
      </View>
    );
  };

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistName} - ${albumName}`,
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      {!isLoading ? (
        <FlatList
          data={albumTracklist}
          renderItem={itemTrackList}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={itemSeparator}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={ListFooter}
          initialNumToRender={12}
        />
      ) : (
        <LoadingContainer />
      )}
    </View>
  );
};

AlbumDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default AlbumDetailsScreen;
