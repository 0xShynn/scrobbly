import React, { useCallback, useEffect, useState } from 'react'
import { Button, FlatList, Image, StyleSheet, View } from 'react-native'
import LoadingContainer from '../components/UI/LoadingContainer'
import { TextH5, TextH6, TitleH3, TitleH6 } from '../components/UI/Typography'
import { api_key, baseUrl, username } from '../utils/lastfm'

const itemList = ({ item }) => {
  return (
    <View style={styles.trackItem}>
      <TitleH6 style={{ minWidth: 25 }} children={item['@attr'].rank} />
      <TextH6 numberOfLines={1} style={{ flex: 1 }} children={item.name} />
      <TextH6 children={item.duration} />
    </View>
  )
}

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

  const itemSeparator = () => <View style={styles.itemSeparator} />

  const ListHeader = () => (
    <View style={styles.albumInfoContainer}>
      <View>
        <Image source={{ uri: albumArt }} style={styles.albumArt} />
      </View>
      <View style={styles.albumInfo}>
        <TitleH3 numberOfLines={2} children={albumName} />
        <TextH5 style={{ marginTop: 2 }} children={artistName} />
      </View>
    </View>
  )

  const ListFooter = () => <View style={styles.listFooter} />

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <View>
        {albumTracklist.length === 0 ? (
          <View style={styles.flatList}>
            <ListHeader />
            <View>
              <TextH5
                style={{ textAlign: 'center' }}
                children="Tracklist not found"
              />
              <Button
                title="Go Back"
                onPress={() => props.navigation.goBack()}
              />
            </View>
          </View>
        ) : (
          <FlatList
            data={albumTracklist}
            renderItem={itemList}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={itemSeparator}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            style={styles.flatList}
          />
        )}
      </View>
    )
  }
}

export default AlbumDetailsScreen

const styles = StyleSheet.create({
  albumInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  albumInfo: {
    marginLeft: 10,
    flex: 1,
  },
  albumArt: {
    width: 120,
    height: 120,
    borderRadius: 6,
    overflow: 'hidden',
  },
  flatList: {
    padding: 30,
    height: '100%',
  },
  trackItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#DDD',
  },
  listFooter: {
    height: 60,
  },
})
