import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import myColors from "../constants/myColors";

import SimilarItem from "../components/SimilarItem";
import DetailsHeader from "../components/DetailsHeader";
import TouchableItem from "../components/TouchableItem";

import RoundedContainer from "../components/UI/RoundedContainer";
import LoadingContainer from "../components/UI/LoadingContainer";
import CustomText from "../components/UI/CustomText";
import CustomButton from "../components/UI/CustomButton";
import ItemStats from "../components/ItemStats";
import DetailsTitle from "../components/DetailsTitle";

import {
  getAlbumInfo,
  getArtistInfo,
  getSimilarTracks,
  getTrackInfo,
} from "../utils/lastfm";
import abbreviateNumber from "../utils/numbers";
import spacing from "../constants/spacing";
import useColorScheme from "../hooks/useColorSchemeFix";

const ScrobbleDetailsScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [trackInfo, setTrackInfo] = useState();
  const [albumInfo, setAlbumInfo] = useState();
  const [artistInfo, setArtistInfo] = useState();
  const [similarTracks, setSimilarTracks] = useState([]);
  const [error, setError] = useState();
  const isDarkTheme = useColorScheme() === "dark";
  const username = useSelector((state) => state.auth.username);
  const {
    artistName,
    albumName,
    albumArt,
    trackName,
    topPlaycount,
  } = route.params;

  const itemSimilarTrackHandler = async (
    artistNameArg,
    trackNameArg,
    albumArtArg,
    albumNameArg
  ) => {
    navigation.push("Scrobble Details", {
      artistName: artistNameArg,
      trackName: trackNameArg,
      albumArt: albumArtArg,
      albumName: albumNameArg,
    });
  };

  const albumDetailsHandler = () => {
    navigation.push("Album Details", {
      artistName,
      albumArt,
      albumName,
    });
  };

  const artistDetailsHandler = () => {
    const { artistImage, playcount, listeners } = artistInfo;
    navigation.navigate("Artist Details", {
      artistName,
      artistImage,
      playcount,
      listeners,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const trackInfoData = await getTrackInfo(
          username,
          artistName,
          trackName
        );
        setTrackInfo(trackInfoData);

        const artistInfoData = await getArtistInfo(username, artistName);
        setArtistInfo(artistInfoData);

        const similarTracksData = await getSimilarTracks(artistName, trackName);
        setSimilarTracks(similarTracksData);

        const albumInfoData = await getAlbumInfo(
          username,
          artistName,
          albumName
        );
        setAlbumInfo(albumInfoData);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.log(error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistName} - ${trackName}`,
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      <DetailsHeader
        title={trackName}
        subtitle={artistName}
        image={albumArt}
        style={{ marginBottom: 10 }}
      />

      {isLoading ? (
        <View style={{ paddingVertical: 50 }}>
          <LoadingContainer />
        </View>
      ) : (
        <View style={{ padding: 15 }}>
          {error ? (
            <>
              <RoundedContainer style={{ alignItems: "center" }}>
                <CustomText size="H5" style={{ marginVertical: 15 }}>
                  {error.message}
                </CustomText>
              </RoundedContainer>
              <CustomButton
                label="Go Back"
                onPress={() => navigation.goBack()}
                style={{ marginVertical: spacing.md }}
              />
            </>
          ) : null}

          {trackInfo !== undefined && (
            <ItemStats
              playcount={trackInfo.playcount}
              userplaycount={trackInfo.userplaycount}
              listeners={trackInfo.listeners}
              topPlaycount={topPlaycount}
            />
          )}

          {albumInfo !== undefined && (
            <>
              <DetailsTitle>From the album</DetailsTitle>
              <TouchableItem
                onPress={albumDetailsHandler}
                style={{ marginBottom: spacing.md }}
              >
                <Image
                  source={{ uri: albumArt }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                />
                <View
                  style={{
                    marginLeft: 14,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <CustomText
                    size="H5"
                    bold
                    color={isDarkTheme ? "white" : myColors.gray_900}
                    numberOfLines={2}
                    complementaryStyle={{ marginBottom: 4 }}
                  >
                    {albumInfo.albumName}
                  </CustomText>
                  <CustomText
                    size="H6"
                    color={isDarkTheme ? "white" : myColors.gray_700}
                  >
                    {`${abbreviateNumber(albumInfo.playcount)} scrobbles`}
                  </CustomText>
                </View>
              </TouchableItem>
            </>
          )}

          {artistInfo !== undefined && (
            <>
              <DetailsTitle>Artist details</DetailsTitle>
              <TouchableItem
                onPress={artistDetailsHandler}
                style={{ marginBottom: 30 }}
              >
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
                    bold
                    color={isDarkTheme ? "white" : myColors.gray_900}
                    complementaryStyle={{ marginBottom: 4 }}
                  >
                    {artistName}
                  </CustomText>
                  <CustomText
                    size="H6"
                    color={isDarkTheme ? "white" : myColors.gray_700}
                    numberOfLines={2}
                  >
                    {abbreviateNumber(artistInfo.playcount)} scrobbles
                  </CustomText>
                </View>
              </TouchableItem>
            </>
          )}

          {similarTracks.length !== 0 && (
            <View>
              <DetailsTitle>Similar Tracks</DetailsTitle>
              {similarTracks.map((item) => (
                <SimilarItem
                  title={item.trackName}
                  subtitle={item.artistName}
                  image={item.albumArt}
                  playcount={item.playcount}
                  key={item.id}
                  onPress={() => {
                    itemSimilarTrackHandler(
                      item.artistName,
                      item.trackName,
                      item.albumArt,
                      item.albumName
                    );
                  }}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

ScrobbleDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ScrobbleDetailsScreen;
