import React, { useCallback, useEffect, useState } from 'react'
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
import { api_key, baseUrl, username } from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'
import { TextH5, TextH6, TitleH3, TitleH4 } from '../components/UI/Typography'

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
        // console.log('album tracklist', albumTrackList)
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
      return
    }
    props.navigation.navigate('Album Details', {
      artistName,
      albumArt,
      albumName,
    })
  }

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
  } else {
    return (
      <View>
        {error && (
          <ErrorBanner>Sorry there's some missing information.</ErrorBanner>
        )}

        <ScrollView>
          <View>
            <View style={styles.headerContainer}>
              <Image source={{ uri: albumArt }} style={styles.albumArt} />
              <View style={styles.headerTitle}>
                <TitleH3 numberOfLines={2} color="white" children={titleName} />
                <TextH5
                  color="white"
                  style={{ marginTop: 4 }}
                  children={artistName}
                />
              </View>
            </View>

            <View style={styles.countersContainer}>
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
                    <TitleH4
                      style={{ marginBottom: 12, textTransform: 'uppercase' }}
                      children="From the Album"
                    />
                    <View style={styles.albumDetailsContainer}>
                      <Image
                        source={{ uri: albumArt }}
                        style={styles.albumDetailsArt}
                      />
                      <View style={styles.albumInfoContainer}>
                        <TitleH3
                          numberOfLines={1}
                          style={styles.albumTitle}
                          children={albumInfo.name}
                        />
                        <TextH5
                          children={abbreviateNumber(albumInfo.listeners)}
                        />
                        <TextH5
                          children={abbreviateNumber(albumInfo.playcount)}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </RoundedContainer>
              )}

              <RoundedContainer>
                <TitleH4
                  style={{ marginBottom: 12, textTransform: 'uppercase' }}
                  children="Biography"
                />
                <View>
                  <TextH6
                    children={`Total Scrobbles: ${abbreviateNumber(
                      artistData.artistScrobbled
                    )}`}
                  />
                  <TextH6
                    children={`Total Listeners: ${abbreviateNumber(
                      artistData.artistListeners
                    )}`}
                  />
                  <TextH6
                    numberOfLines={5}
                    children={`Summary: ${artistData.artistSummary}`}
                  />
                </View>
              </RoundedContainer>

              {similarTracks.length !== 0 && (
                <RoundedContainer>
                  <TitleH4
                    style={{ textTransform: 'uppercase' }}
                    children="Similar Tracks"
                  />
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
  headerContainer: {
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  mainContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  albumDetailsContainer: {
    flexDirection: 'row',
  },
  albumInfoContainer: {
    marginLeft: 14,
    flex: 1,
  },
  albumDetailsArt: {
    width: 80,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
})

export default DetailsScreen
