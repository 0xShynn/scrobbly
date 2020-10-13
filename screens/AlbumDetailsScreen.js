import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native'
import LoadingContainer from '../components/UI/LoadingContainer'
import { TextH5, TextH6, TitleH3, TitleH6 } from '../components/UI/Typography'
import { api_key, baseUrl, username } from '../utils/lastfm'
import myColors from '../constants/myColors'

const itemList = ({ item }) => {
  return (
    <View style={styles.trackItem}>
      <TitleH6 style={{ minWidth: 25 }} children={item['@attr'].rank} />
      <TextH6 numberOfLines={1} style={{ flex: 1 }} children={item.name} />
      <TextH6 children={item.duration} />
    </View>
  )
}

const itemSeparator = () => <View style={styles.itemSeparator} />

const AlbumDetailsScreen = (props) => {
  const artistName = props.route.params.artistName
  const albumName = props.route.params.albumName
  const albumArt = props.route.params.albumArt

  const [isLoading, setIsLoading] = useState(false)
  const [albumTracklist, setAlbumTracklist] = useState([])

  const getAlbumInfoHandler = useCallback(
    async (artistName, albumName) => {
      const getAlbumInfo = `?method=album.getinfo&api_key=${api_key}&artist=${artistName}&album=${albumName}&username=${username}&format=json`

      try {
        const response = await fetch(baseUrl + getAlbumInfo)
        const resData = await response.json()
        // console.log('getAlbumInfoHandler', resData)

        if (!resData.hasOwnProperty('error')) {
          setAlbumTracklist(resData.album.tracks.track)
          // console.log('album tracklist', albumTracklist)
        }
      } catch (error) {
        console.log('getAlbumInfoHandler erreur', error)
      }
    },
    [getAlbumInfoHandler]
  )

  useEffect(() => {
    setIsLoading(true)
    getAlbumInfoHandler(artistName, albumName).then(() => setIsLoading(false))
  }, [getAlbumInfoHandler, setIsLoading, artistName, albumName])

  const keyExtractor = useCallback(
    (item) => item + Math.random().toString(),
    []
  )

  const ListHeader = () => (
    <View style={styles.albumInfoContainer}>
      <View>
        <Image source={{ uri: albumArt }} style={styles.albumArt} />
      </View>
      <View style={styles.albumInfo}>
        <TitleH3
          style={{ color: 'white' }}
          numberOfLines={2}
          children={albumName}
        />
        <TextH5
          style={{ marginTop: 2, color: 'white' }}
          numberOfLines={1}
          children={artistName}
        />
      </View>
    </View>
  )

  const ListEmpty = () => (
    <View style={{ ...styles.listContainer, ...styles.listEmpty }}>
      <TextH6 style={{ textAlign: 'center' }} children="Tracklist not found" />
      <Button title="Go Back" onPress={() => props.navigation.goBack()} />
    </View>
  )

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={albumTracklist}
          renderItem={itemList}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparator}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          onEndReachedThreshold={0.2}
          style={styles.listContainer}
        />
      </View>
    )
  }
}

export default AlbumDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.blue_gray_100,
  },
  listContainer: {
    height: Dimensions.get('window').height,
  },
  listEmpty: {
    height: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: myColors.dark_gray,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  albumInfo: {
    marginLeft: 20,
    flex: 1,
  },
  albumArt: {
    width: 120,
    height: 120,
    borderRadius: 6,
    overflow: 'hidden',
  },
  trackItem: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: myColors.blue_gray_100,
  },
})
