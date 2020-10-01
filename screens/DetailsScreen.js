import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl } from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'
import { FlatList } from 'react-native-gesture-handler'

const DetailsScreen = (props) => {
  const [trackInfo, setTrackInfo] = useState({})
  const [artistInfo, setArtistInfo] = useState({})
  const [similarTracks, setSimilarTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const artistName = props.route.params.artist
  const titleName = props.route.params.title
  const albumArt = props.route.params.image

  const getTrackInfoHandler = useCallback(async () => {
    const getTrackInfo = `?method=track.getInfo&api_key=${api_key}&artist=${artistName}&track=${titleName}&format=json`

    try {
      const response = await fetch(baseUrl + getTrackInfo)

      if (!response.ok) {
        const errorResData = await response.json()
        console.log(errorResData)
      }

      const resData = await response.json()
      // console.log(resData.track)

      setTrackInfo({ ...resData.track })
    } catch (error) {
      throw error
    }
  }, [getTrackInfoHandler, setTrackInfo])

  const getArtistInfoHandler = useCallback(async () => {
    const getArtistInfo = `?method=artist.getinfo&artist=${artistName}&api_key=${api_key}&format=json`

    try {
      const response = await fetch(baseUrl + getArtistInfo)

      if (!response.ok) {
        const errorResData = await response.json()
        console.log(errorResData)
      }

      const resData = await response.json()
      console.log(resData)
    } catch (error) {
      throw error
    }
  }, [getArtistInfoHandler])

  const getSimilarTracksHandler = useCallback(async () => {
    const getSimilarTracks = `?method=track.getsimilar&artist=${artistName}&track=${titleName}&api_key=${api_key}&limit=5&format=json`

    try {
      const response = await fetch(baseUrl + getSimilarTracks)

      if (!response.ok) {
        const errorResData = await response.json()
        console.log(errorResData)
      }

      const resData = await response.json()
      setSimilarTracks(resData.similartracks.track)
      console.log('ICCCCIIII', similarTracks)
    } catch (error) {
      throw error
    }
  }, [getSimilarTracksHandler])

  useEffect(() => {
    setIsLoading(true)
    getArtistInfoHandler()
    getSimilarTracksHandler()
    getTrackInfoHandler().then(() => {
      setIsLoading(false)
    })
  }, [getArtistInfoHandler, getTrackInfoHandler, getSimilarTracksHandler])

  if (isLoading) {
    return <LoadingContainer />
  }

  if (!isLoading) {
    return (
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
                {trackInfo.playcount
                  ? abbreviateNumber(trackInfo.playcount)
                  : '?'}
              </Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.titleInfo}>Listeners</Text>
              <Text style={styles.valueInfo}>
                {trackInfo.listeners
                  ? abbreviateNumber(trackInfo.listeners)
                  : '?'}
              </Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.titleInfo}>Your Scrobbles</Text>
              <Text style={styles.valueInfo}>0</Text>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <FlatList
              data={similarTracks}
              ListHeaderComponent={() => {
                return (
                  <View>
                    <Text>Similar Tracks</Text>
                  </View>
                )
              }}
              renderItem={(itemData) => (
                <View style={styles.similarTrack}>
                  <View style={styles.similarInfo}>
                    <Text numberOfLines={1} style={styles.similarInfoTitle}>
                      {itemData.item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.similarInfoArtist}>
                      {itemData.item.artist.name}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
  },
  love: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#CCC',
  },
  mainContainer: { padding: 20 },
  similarTrack: {},

  similarInfo: {
    paddingVertical: 10,
  },
  similarInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default DetailsScreen
