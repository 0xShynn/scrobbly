import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'

import myColors from '../constants/myColors'
import ListItemCover from '../components/ListItemCover'

const listItemSeparator = () => <View style={styles.listItemSeparator} />

const listFooter = () => {
  return <View style={styles.listFooter} />
}

const TopArtistsScreen = (props) => {
  const [topArtists, setTopArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()

  const getTopArtistsHandler = async () => {
    const getTopArtists = `?method=user.gettopartists&user=${username}&api_key=${api_key}&period=7day&limit=20&format=json`

    try {
      const response = await fetch(baseUrl + getTopArtists)
      const resData = await response.json()
      setTopArtists(resData.topartists.artist)
    } catch (error) {
      console.log(error)
    }
  }

  const itemSelectHandler = (artist) => {
    props.navigation.navigate('Artist Details', { artist })
  }

  const listItem = ({ item }) => {
    const artistName = item.name
    const playCount = item.playcount

    return (
      <ListItemCover
        title={artistName}
        playcount={playCount}
        onSelect={itemSelectHandler.bind(this, artistName)}
      />
    )
  }

  const keyExtractor = useCallback(
    (item) => item.name + Math.random().toString(),
    []
  )

  useEffect(() => {
    setIsLoading(true)
    getTopArtistsHandler().then(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatList
        data={topArtists}
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

export default TopArtistsScreen
