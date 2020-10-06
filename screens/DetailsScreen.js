import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
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

import { api_key, baseUrl, username } from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'

const DetailsScreen = (props) => {
  const [trackInfo, setTrackInfo] = useState({})
  const [artistData, setArtistData] = useState({})
  const [similarTracks, setSimilarTracks] = useState([])
  const [albumInfo, setAlbumInfo] = useState()
  const [albumTrackList, setAlbumTrackList] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const artistName = props.route.params.artist
  const titleName = props.route.params.title
  const albumArt = props.route.params.image
  const albumName = props.route.params.album

  const getTrackInfoHandler = useCallback(async () => {
    const getTrackInfo = `?method=track.getInfo&api_key=${api_key}&artist=${artistName}&track=${titleName}&username=${username}&format=json`

    try {
      const response = await fetch(baseUrl + getTrackInfo)
      const resData = await response.json()
      // console.log('trackInfo', resData)

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

  const getAlbumInfoHandler = useCallback(async () => {
    const getAlbumInfo = `?method=album.getinfo&api_key=${api_key}&artist=${artistName}&album=${albumName}&username=${username}&format=json`

    try {
      const response = await fetch(baseUrl + getAlbumInfo)
      const resData = await response.json()

      if (!resData.hasOwnProperty('error')) {
        setAlbumInfo(resData.album)
        setAlbumTrackList(resData.album.tracks.track)
        console.log('album tracklist', albumTrackList)
      }
    } catch (error) {
      console.log('getAlbumInfoHandler erreur', error)
    }
  }, [getAlbumInfoHandler])

  const onSelectHandler = (artist, title, image) => {
    props.navigation.push('Details', {
      artist,
      title,
      image,
    })
  }

  const albumDetailsHandler = () => {
    if (albumTrackList.length <= 0) {
      console.log('rien')
      return
    }
    props.navigation.navigate('AlbumDetails', {
      albumTrackList,
      artistName,
      albumArt,
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
      .then(() => getAlbumInfoHandler())
      .then(() => getSimilarTracksHandler())
      .then(() => setIsLoading(false))
  }, [
    getArtistInfoHandler,
    getSimilarTracksHandler,
    getTrackInfoHandler,
    getAlbumInfoHandler,
  ])

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
              {albumInfo && (
                <RoundedContainer>
                  <TouchableOpacity onPress={albumDetailsHandler}>
                    <Text style={styles.titled}>From the Album</Text>
                    <View style={styles.albumContainer}>
                      <View style={styles.albumArtContainer}>
                        <Image
                          source={{ uri: albumArt }}
                          style={styles.albumImage}
                        />
                      </View>
                      <View style={styles.albumInfoContainer}>
                        <Text numberOfLines={1} style={styles.albumTitle}>
                          {albumInfo.name}
                        </Text>
                        <Text>{abbreviateNumber(albumInfo.listeners)}</Text>
                        <Text>{abbreviateNumber(albumInfo.playcount)}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </RoundedContainer>
              )}

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
                <RoundedContainer>
                  <Text style={styles.titled}>Similar Tracks</Text>
                  {similarTracks.map((itemData, index) => {
                    return (
                      <SimilarTrack
                        item={itemData}
                        index={index}
                        key={index}
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
                </RoundedContainer>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  albumContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  albumArtContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  albumInfoContainer: {
    marginLeft: 14,
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trackItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  trackRank: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  trackName: {
    flex: 1,
  },
  albumImage: {
    width: 80,
    height: 80,
    backgroundColor: '#333',
  },
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
