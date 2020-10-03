import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native'
import SimilarTrack from '../components/SimilarTrack'
import CenteredContainer from '../components/UI/CenteredContainer'
import ErrorBanner from '../components/UI/ErrorBanner'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'

const DetailsScreen = (props) => {
  const [trackInfo, setTrackInfo] = useState({})
  const [artistData, setArtistData] = useState({})
  const [similarTracks, setSimilarTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const artistName = props.route.params.artist
  const titleName = props.route.params.title
  const albumArt = props.route.params.image

  const getTrackInfoHandler = useCallback(async () => {
    const getTrackInfo = `?method=track.getInfo&api_key=${api_key}&artist=${artistName}&track=${titleName}&username=${username}&format=json`

    try {
      const response = await fetch(baseUrl + getTrackInfo)
      const resData = await response.json()

      if (resData.hasOwnProperty('error')) {
        setError(resData)
      } else {
        setTrackInfo(resData.track)
      }
    } catch (error) {
      console.log('getTrackInfoHandler erreur', error)
    }
  }, [getTrackInfoHandler])

  const getArtistInfoHandler = useCallback(async () => {
    const getArtistInfo = `?method=artist.getinfo&artist=${artistName}&username=${username}&api_key=${api_key}&format=json`

    try {
      const response = await fetch(baseUrl + getArtistInfo)
      const resData = await response.json()

      if (resData.hasOwnProperty('error')) {
        setError(resData)
      } else {
        setArtistData({
          artistBio: resData.artist.bio.content,
          artistSummary: resData.artist.bio.summary,
          artistName: resData.artist.name,
          artistScrobbled: resData.artist.stats.playcount,
          artistListeners: resData.artist.stats.listeners,
        })
      }
    } catch (error) {
      console.log('getArtistInfoHandler erreur', error)
    }
  }, [getArtistInfoHandler])

  const getSimilarTracksHandler = useCallback(async () => {
    const getSimilarTracks = `?method=track.getsimilar&artist=${artistName}&track=${titleName}&api_key=${api_key}&limit=5&format=json`

    try {
      const response = await fetch(baseUrl + getSimilarTracks)
      const resData = await response.json()

      if (!resData.hasOwnProperty('error')) {
        setSimilarTracks(resData.similartracks.track)
      }
    } catch (error) {
      console.log('getSimilarTracksHandler erreur', error)
    }
  }, [getSimilarTracksHandler])

  // useEffect(() => {
  //   setIsLoading(true)
  //   getArtistInfoHandler()
  //   getSimilarTracksHandler()
  //   getTrackInfoHandler().then(() => {
  //     setIsLoading(false)
  //   })
  // }, [getArtistInfoHandler, getSimilarTracksHandler, getTrackInfoHandler])

  useEffect(() => {
    setIsLoading(true)
    getTrackInfoHandler()
      .then(() => getArtistInfoHandler())
      .then(() => getSimilarTracksHandler())
      .then(() => setIsLoading(false))
  }, [getArtistInfoHandler, getSimilarTracksHandler, getTrackInfoHandler])

  if (isLoading) {
    return <LoadingContainer />
  }

  const returnHandler = () => {
    props.navigation.goBack()
  }

  if (!isLoading) {
    return (
      <View>
        {error && (
          <ErrorBanner>Sorry there's some missing information.</ErrorBanner>
        )}
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: albumArt }} style={styles.image} />
              </View>
              <View style={styles.headerTitle}>
                <Text style={styles.title} numberOfLines={1}>
                  {titleName}
                </Text>
                <Text style={styles.artist}>{artistName}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.counter}>
                <Text style={styles.titleInfo}>Scrobbles</Text>
                <Text style={styles.valueInfo}>
                  {trackInfo.hasOwnProperty('playcount')
                    ? abbreviateNumber(trackInfo.playcount)
                    : '?'}
                </Text>
              </View>

              <View style={styles.counter}>
                <Text style={styles.titleInfo}>Listeners</Text>
                <Text style={styles.valueInfo}>
                  {trackInfo.hasOwnProperty('listeners')
                    ? abbreviateNumber(trackInfo.listeners)
                    : '?'}
                </Text>
              </View>

              <View style={styles.counter}>
                <Text style={styles.titleInfo}>Your Scrobbles</Text>
                <Text style={styles.valueInfo}>
                  {trackInfo.hasOwnProperty('userplaycount')
                    ? abbreviateNumber(trackInfo.userplaycount)
                    : '?'}
                </Text>
              </View>
            </View>

            <View style={styles.mainContainer}>
              <View>
                <Text>
                  Total Scrobbles:
                  {abbreviateNumber(artistData.artistScrobbled)}
                </Text>
                <Text>
                  Total Listeners:
                  {abbreviateNumber(artistData.artistListeners)}
                </Text>
                <Text numberOfLines={5}>
                  Summary: {artistData.artistSummary}
                </Text>
              </View>
              {similarTracks &&
                similarTracks.map((itemData, index) => {
                  return <SimilarTrack item={itemData} index={index} />
                })}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#DDD',
    height: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  topContainer: {
    backgroundColor: '#111',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist: {
    fontSize: 20,
    color: '#DDD',
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  counter: {
    padding: 20,
  },
  titleInfo: {
    textTransform: 'uppercase',
    color: '#555',
  },
  valueInfo: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  love: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#CCC',
  },
  mainContainer: { padding: 20 },
})

export default DetailsScreen
