import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import myColors from '../constants/myColors'

import SimilarTrack from '../components/SimilarTrack'
import DetailsHeader from '../components/DetailsHeader'
import RoundedContainer from '../components/UI/RoundedContainer'
import Counter from '../components/UI/Counter'
import LoadingContainer from '../components/UI/LoadingContainer'
import {
  TextH5,
  TextH6,
  DetailsTitle,
  TitleH4,
  TitleH5,
} from '../components/UI/Typography'
import CustomButton from '../components/UI/CustomButton'

import {
  getAlbumInfo,
  getArtistInfo,
  getSimilarTracks,
  getTrackInfo,
} from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'

const ScrobbleDetailsScreen = ({ navigation, route }) => {
  const [trackInfo, setTrackInfo] = useState()
  const [artistInfo, setArtistInfo] = useState()
  const [similarTracks, setSimilarTracks] = useState([])
  const [albumInfo, setAlbumInfo] = useState()
  const [isLoading, setIsLoading] = useState(false)
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

  const biographyDetailsHandler = () => {
    navigation.navigate('Biography Details', { artistInfo, artistName })
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
                onPress={() => {
                  navigation.goBack()
                }}
              />
            </>
          ) : null}

          {trackInfo !== undefined && (
            <RoundedContainer style={{ flex: 1, flexDirection: 'row' }}>
              <Counter
                title="Played"
                icon="ios-musical-notes"
                value={topPlaycount ? topPlaycount : trackInfo.userplaycount}
              />

              <Counter
                title="Scrobbles"
                icon="ios-globe"
                value={abbreviateNumber(trackInfo.playcount)}
              />

              <Counter
                title="Listeners"
                icon="md-person"
                value={abbreviateNumber(trackInfo.listeners)}
              />
            </RoundedContainer>
          )}

          {albumInfo !== undefined && (
            <RoundedContainer>
              <TouchableOpacity onPress={albumDetailsHandler}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    {/* <DetailsTitle children="From the album" /> */}
                    <TitleH5
                      numberOfLines={2}
                      style={styles.albumTitle}
                      children={albumInfo.name}
                    />
                    <TextH6
                      children={albumInfo.listeners + ' Listeners'}
                      style={{ color: myColors.cool_gray_500 }}
                    />
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={20}
                      color={myColors.cool_gray_500}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </RoundedContainer>
          )}

          {artistInfo !== undefined && (
            <TouchableOpacity onPress={biographyDetailsHandler}>
              <RoundedContainer
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}
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
                  <TitleH4 style={{ marginBottom: 4 }} children={artistName} />

                  <TextH6
                    style={{ color: myColors.cool_gray_500 }}
                    numberOfLines={2}
                  >
                    {abbreviateNumber(artistInfo.playcount)} Scrobbles
                  </TextH6>
                  <TextH6 style={{ color: myColors.cool_gray_500 }}>
                    {abbreviateNumber(artistInfo.listeners)} Listeners
                  </TextH6>
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={20}
                    color={myColors.cool_gray_500}
                  />
                </View>
              </RoundedContainer>
            </TouchableOpacity>
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
                  onSelect={itemSelectHandler.bind(
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
