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
import ErrorBanner from '../components/UI/ErrorBanner'
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

const ScrobbleDetailsScreen = ({ navigation, route }) => {
  const [trackInfo, setTrackInfo] = useState({})
  const [artistInfo, setArtistInfo] = useState({})
  const [similarTracks, setSimilarTracks] = useState([])
  const [albumInfo, setAlbumInfo] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const username = useSelector((state) => state.auth.username)

  const { artistName, albumName, albumArt, trackName } = route.params

  const itemSelectHandler = (artist, title, image) => {
    navigation.push('Details', {
      artist,
      title,
      image,
    })
  }

  const albumDetailsHandler = () => {
    if (albumTrackList.length <= 0) {
      return
    }
    navigation.navigate('Album Details', {
      artistName,
      albumArt,
      albumName,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const trackInfoData = await getTrackInfo(username, artistName, trackName)
      setTrackInfo(trackInfoData)

      const similarTracksData = await getSimilarTracks(artistName, trackName)
      setSimilarTracks(similarTracksData)

      const artistInfoData = await getArtistInfo(username, artistName)
      setArtistInfo(artistInfoData)

      const albumInfoData = await getAlbumInfo(username, artistName, albumName)
      setAlbumInfo(albumInfoData)

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
      {error && (
        <ErrorBanner>Sorry there's some missing information.</ErrorBanner>
      )}

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
              <RoundedContainer style={{ flex: 1, flexDirection: 'row' }}>
                <Counter
                  title="Played"
                  icon="ios-musical-notes"
                  value={
                    trackInfo.hasOwnProperty('userplaycount')
                      ? abbreviateNumber(trackInfo.userplaycount)
                      : '?'
                  }
                />

                <Counter
                  title="Scrobbles"
                  icon="ios-globe"
                  value={
                    trackInfo.hasOwnProperty('playcount')
                      ? abbreviateNumber(trackInfo.playcount)
                      : '?'
                  }
                />

                <Counter
                  title="Listeners"
                  icon="md-person"
                  value={
                    trackInfo.hasOwnProperty('listeners')
                      ? abbreviateNumber(trackInfo.listeners)
                      : '?'
                  }
                />
              </RoundedContainer>

              {albumInfo && (
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

              <RoundedContainer>
                <DetailsTitle children="Biography" />
                <View>
                  <TextH6
                    numberOfLines={5}
                    children={artistInfo.artistSummary}
                  />
                </View>
              </RoundedContainer>

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
                        item.albumArt
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
