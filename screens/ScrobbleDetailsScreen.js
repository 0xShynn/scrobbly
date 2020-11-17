import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import SimilarTrack from '../components/SimilarTrack'
import RoundedContainer from '../components/UI/RoundedContainer'
import Counter from '../components/UI/Counter'
import LoadingContainer from '../components/UI/LoadingContainer'
import {
  getAlbumInfo,
  getArtistInfo,
  getSimilarTracks,
  getTrackInfo,
} from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'
import {
  TextH5,
  TextH6,
  DetailsTitle,
  TitleH4,
} from '../components/UI/Typography'
import myColors from '../constants/myColors'
import DetailsHeader from '../components/DetailsHeader'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import CustomButton from '../components/UI/CustomButton'

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
    <View style={{ flex: 1, backgroundColor: myColors.dark_gray }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
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
            <View style={{ padding: 20 }}>
              {error ? (
                <>
                  <RoundedContainer style={{ alignItems: 'center' }}>
                    <TextH5 style={{ marginVertical: 15 }}>
                      {error.message}
                    </TextH5>
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
                    value={
                      topPlaycount ? topPlaycount : trackInfo.userplaycount
                    }
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
                    <DetailsTitle children="From the album" />
                    <View style={{ flexDirection: 'row' }}>
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
                        <TitleH4
                          numberOfLines={2}
                          style={styles.albumTitle}
                          children={albumInfo.name}
                        />
                        <TextH5 children={albumInfo.listeners + ' listeners'} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </RoundedContainer>
              )}

              {artistInfo !== undefined && (
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#1E1E1E',
                      padding: 20,
                      borderTopStartRadius: 20,
                      borderTopEndRadius: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: '#111',
                    }}
                  >
                    <TouchableOpacity onPress={biographyDetailsHandler}>
                      <Image
                        source={{ uri: artistInfo.image }}
                        style={{
                          width: 140,
                          height: 140,
                          borderRadius: 70,
                          marginBottom: 20,
                        }}
                      />
                    </TouchableOpacity>
                    <TitleH4 style={{ marginBottom: 4 }}>{artistName}</TitleH4>
                    <TextH6
                      style={{
                        color: myColors.cool_gray_400,
                      }}
                    >
                      Scrobbles {abbreviateNumber(artistInfo.playcount)} |
                      Listeners {abbreviateNumber(artistInfo.listeners)}
                    </TextH6>
                  </View>
                  <TouchableOpacity
                    onPress={biographyDetailsHandler}
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                      backgroundColor: '#1A1A1A',
                      padding: 20,
                      borderBottomEndRadius: 20,
                      borderBottomStartRadius: 20,
                      marginBottom: 20,
                      borderTopWidth: 1,
                      borderTopColor: '#333',
                    }}
                  >
                    <TextH6
                      numberOfLines={5}
                      children={artistInfo.summary}
                      style={{ flex: 1 }}
                    />
                    <Ionicons
                      name="ios-arrow-forward"
                      size={24}
                      color={myColors.cool_gray_500}
                      style={{ paddingLeft: 15 }}
                    />
                  </TouchableOpacity>
                </View>
              )}

              {similarTracks.length !== 0 && (
                <RoundedContainer>
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
                </RoundedContainer>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
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
