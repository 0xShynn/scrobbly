import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'

const DetailsScreen = (props) => {
  const [trackInfo, setTrackInfo] = useState({})
  const [artistInfo, setArtistInfo] = useState({})
  const [artistData, setArtistData] = useState({})
  const [similarTracks, setSimilarTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const artistName = props.route.params.artist
  const titleName = props.route.params.title
  const albumArt = props.route.params.image

  const getTrackInfoHandler = useCallback(async () => {
    const getTrackInfo = `?method=track.getInfo&api_key=${api_key}&artist=${artistName}&track=${titleName}&username=${username}&format=json`

    try {
      const response = await fetch(baseUrl + getTrackInfo)

      if (!response.ok) {
        const errorResData = await response.json()
        console.log(errorResData)
      }

      const resData = await response.json()
      // console.log(resData.track)
      setTrackInfo(resData.track)
    } catch (error) {
      throw error
    }
  }, [getTrackInfoHandler])

  const getArtistInfoHandler = useCallback(async () => {
    const getArtistInfo = `?method=artist.getinfo&artist=${artistName}&username=${username}&api_key=${api_key}&format=json`

    try {
      const response = await fetch(baseUrl + getArtistInfo)

      if (!response.ok) {
        const errorResData = await response.json()
        console.log(errorResData)
      }

      const resData = await response.json()
      // console.log('resData', resData)

      setArtistData({
        artistBio: resData.artist.bio.content,
        artistSummary: resData.artist.bio.summary,
        artistName: resData.artist.name,
        artistScrobbled: resData.artist.stats.playcount,
        artistListeners: resData.artist.stats.listeners,
      })
      setArtistInfo(resData.artist)
    } catch (error) {
      throw error
    }
  }, [getArtistInfoHandler, setArtistInfo])

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
  }, [getArtistInfoHandler, getSimilarTracksHandler, getTrackInfoHandler])

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
              <Text style={styles.valueInfo}>
                {abbreviateNumber(trackInfo.userplaycount)}
              </Text>
            </View>
          </View>

          <View style={styles.mainContainer}>
            <Text>{artistData.artistName}</Text>
            <Text>
              Total Scrobbles: {abbreviateNumber(artistData.artistScrobbled)}
            </Text>
            <Text>
              Total Listeners: {abbreviateNumber(artistData.artistListeners)}
            </Text>
            <Text numberOfLines={5}>Summary: {artistData.artistSummary}</Text>
            {similarTracks.map((itemData, index) => {
              return (
                <View style={styles.similarTrack} key={index + 1}>
                  <View style={styles.similarInfo}>
                    <Text style={styles.similarTrackCounter}>{index + 1}</Text>
                    <View style={styles.middle}>
                      <Text numberOfLines={1} style={styles.similarInfoTitle}>
                        {itemData.name}
                      </Text>
                      <Text numberOfLines={1} style={styles.similarInfoArtist}>
                        {itemData.artist.name}
                      </Text>
                    </View>
                    <View style={styles.similarTrackData}>
                      <Text style={styles.badge}>
                        {abbreviateNumber(itemData.playcount)}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
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
  similarTrack: {},

  similarInfo: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  similarTrackCounter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingVertical: 4,
    color: '#999',
    fontWeight: 'bold',
    fontSize: 24,
  },
  similarInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  middle: {
    flex: 1,
    paddingRight: 10,
  },
  similarTrackData: {
    alignSelf: 'center',
  },
  badge: {
    backgroundColor: '#DDD',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    color: '#777',
    fontWeight: '600',
  },
})

export default DetailsScreen
