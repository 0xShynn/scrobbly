import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import SimilarTrack from '../components/SimilarTrack'
import RoundedContainer from '../components/UI/RoundedContainer'
import Counter from '../components/UI/Counter'
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
      console.log('trackInfo', resData)

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

  const onSelectHandler = (artist, title, image) => {
    props.navigation.push('Details', {
      artist,
      title,
      image,
    })
  }

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
              <Counter
                title="Scrobbles"
                icon="ios-musical-notes"
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

              <Counter
                title="Your Scrob"
                value={
                  trackInfo.hasOwnProperty('userplaycount')
                    ? abbreviateNumber(trackInfo.userplaycount)
                    : '?'
                }
              />
            </View>

            <View style={styles.mainContainer}>
              <RoundedContainer>
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
              </RoundedContainer>

              {similarTracks.length !== 0 && (
                <View style={styles.roundedContainer}>
                  <Text style={styles.titled}>Similar Tracks</Text>
                  {similarTracks.map((itemData, index) => {
                    return (
                      <SimilarTrack
                        item={itemData}
                        index={index}
                        onSelect={() => {
                          onSelectHandler(
                            itemData.artist.name,
                            itemData.name,
                            itemData.image[3]['#text']
                          )
                        }}
                      />
                    )
                  })}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titled: {
    textTransform: 'uppercase',
    color: '#666',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 10,
  },
  roundedContainer: {
    backgroundColor: '#DDD',
    borderRadius: 20,
    padding: 20,
  },
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
  love: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#CCC',
  },
  mainContainer: { padding: 20 },
})

export default DetailsScreen
