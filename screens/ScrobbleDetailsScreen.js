import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import myColors from '../constants/myColors'

import SimilarTrack from '../components/SimilarTrack'
import DetailsHeader from '../components/DetailsHeader'
import TouchableItem from '../components/TouchableItem'

import RoundedContainer from '../components/UI/RoundedContainer'
import LoadingContainer from '../components/UI/LoadingContainer'
import CustomButton from '../components/UI/CustomButton'
import {
  TextH5,
  TextH6,
  DetailsTitle,
  TitleH5,
} from '../components/UI/Typography'

import {
  getAlbumInfo,
  getArtistInfo,
  getSimilarTracks,
  getTrackInfo,
} from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'
import spacing from '../constants/spacing'
import ItemStats from '../components/ItemStats'

const ScrobbleDetailsScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [trackInfo, setTrackInfo] = useState()
  const [albumInfo, setAlbumInfo] = useState()
  const [artistInfo, setArtistInfo] = useState()
  const [similarTracks, setSimilarTracks] = useState([])
  const [error, setError] = useState()
  const username = useSelector((state) => state.auth.username)
  const {
    artistName,
    albumName,
    albumArt,
    trackName,
    topPlaycount,
  } = route.params

  const itemSelectHandler = async (
    artistName,
    trackName,
    albumArt,
    albumName
  ) => {
    navigation.push('Scrobble Details', {
      artistName,
      trackName,
      albumArt,
      albumName,
    })
  }

  const albumDetailsHandler = () => {
    navigation.navigate('Album Details', {
      artistName,
      albumArt,
      albumName,
    })
  }

  const artistDetailsHandler = () => {
    const artistImage = artistInfo.image
    const playcount = artistInfo.playcount
    const listeners = artistInfo.listeners
    navigation.navigate('Artist Details', {
      artistName,
      artistImage,
      playcount,
      listeners,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const trackInfoData = await getTrackInfo(
          username,
          artistName,
          trackName
        )
        setTrackInfo(trackInfoData)

        const artistInfoData = await getArtistInfo(username, artistName)
        setArtistInfo(artistInfoData)

        const similarTracksData = await getSimilarTracks(artistName, trackName)
        setSimilarTracks(similarTracksData)

        const albumInfoData = await getAlbumInfo(
          username,
          artistName,
          albumName
        )
        setAlbumInfo(albumInfoData)
      } catch (error) {
        setError(error)
        setIsLoading(false)
        console.log(error)
      }

      setIsLoading(false)
    }
    fetchData()
  }, [])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistName} - ${trackName}`,
      headerBackTitle: 'Back',
    })
  }, [navigation])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myColors.dark_gray }}>
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
              <RoundedContainer style={{ alignItems: 'center' }}>
                <TextH5 style={{ marginVertical: 15 }}>{error.message}</TextH5>
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
                  overflow: 'hidden',
                }}
              />
              <View
                style={{
                  marginLeft: 14,
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <TitleH5
                  numberOfLines={2}
                  style={styles.albumTitle}
                  children={albumInfo.albumName}
                />
                <TextH6
                  children={
                    abbreviateNumber(albumInfo.playcount) + ' scrobbles'
                  }
                  style={{ color: myColors.cool_gray_500 }}
                />
              </View>
            </TouchableItem>
          )}

          {artistInfo !== undefined && (
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
                <TitleH5 style={{ marginBottom: 4 }} children={artistName} />
                <TextH6
                  style={{ color: myColors.cool_gray_500 }}
                  numberOfLines={2}
                >
                  {abbreviateNumber(artistInfo.playcount)} scrobbles
                </TextH6>
              </View>
            </TouchableItem>
          )}

          {similarTracks.length !== 0 && (
            <View>
              <DetailsTitle children="Similar Tracks" />
              {similarTracks.map((item) => (
                <SimilarTrack
                  title={item.trackName}
                  subtitle={item.artistName}
                  image={item.albumArt}
                  playcount={item.playcount}
                  key={item.id}
                  onPress={itemSelectHandler.bind(
                    this,
                    item.artistName,
                    item.trackName,
                    item.albumArt,
                    item.albumName
                  )}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  albumDetailsContainer: {
    flexDirection: 'row',
  },
  albumInfoContainer: {
    marginLeft: 14,
    flex: 1,
    justifyContent: 'center',
  },
  albumTitle: {
    marginBottom: 4,
  },
})

export default ScrobbleDetailsScreen
