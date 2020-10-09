import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'
import ListItemCover from '../components/ListItemCover'

const listItemSeparator = () => <View style={styles.listItemSeparator} />

const listFooter = () => {
  return <View style={styles.listFooter} />
}

const TopAlbumsScreen = (props) => {
  const [topAlbums, setTopAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getTopAlbumsHandler = useCallback(async () => {
    const getTopAlbums = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&limit=20&period=7day&format=json`

    try {
      const response = await fetch(baseUrl + getTopAlbums)
      const resData = await response.json()
      setTopAlbums(resData.topalbums.album)
      console.log(topAlbums)
    } catch (error) {
      console.log(error)
    }
  }, [getTopAlbumsHandler, setIsLoading])

  const selectItemHandler = (artistName, albumName, albumArt) => {
    props.navigation.navigate('Album Details', {
      artistName,
      albumArt,
      albumName,
    })
  }

  const listItem = ({ item }) => {
    const albumArt = item.image[3]['#text']
    const artistName = item.artist.name
    const albumName = item.name

    return (
      <ListItemCover
        albumArt={albumArt}
        albumName={albumName}
        artistName={artistName}
        playcount={item.playcount}
        onSelect={() => selectItemHandler(artistName, albumName, albumArt)}
      />
    )
  }

  useEffect(() => {
    setIsLoading(true)
    getTopAlbumsHandler().then(() => {
      setIsLoading(false)
    })
  }, [getTopAlbumsHandler, setIsLoading])

  const keyExtractor = useCallback(
    (item) => item + Math.random().toString(),
    []
  )

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatList
        data={topAlbums}
        renderItem={listItem}
        ItemSeparatorComponent={listItemSeparator}
        ListFooterComponent={listFooter}
        keyExtractor={keyExtractor}
        horizontal={false}
        numColumns={2}
        style={styles.listContainer}
      />
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 4,
    paddingTop: 20,
    paddingBottom: 20,
  },
  listFooter: {
    height: 40,
  },
  listItemSeparator: {
    height: 12,
  },
})

export default TopAlbumsScreen
