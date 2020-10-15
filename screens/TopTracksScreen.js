import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import NewListItem from '../components/NewListItem'
import LoadingContainer from '../components/UI/LoadingContainer'
import { TextH6 } from '../components/UI/Typography'
import myColors from '../constants/myColors'

import { api_key, baseUrl, username } from '../utils/lastfm'

const listItemSeparator = () => <View style={styles.listItemSeparator} />

const listFooter = () => {
  return <View style={styles.listFooter} />
}

const TopTracksScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const [topTracks, setTopTracks] = useState([])

  const getTopTracksHandler = async () => {
    const getTopTracks = `?method=user.gettoptracks&user=${username}&api_key=${api_key}&period=7day&limit=30&format=json`

    try {
      const response = await fetch(baseUrl + getTopTracks)
      const resData = await response.json()
      setTopTracks(resData.toptracks.track)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getTopTracksHandler().then(() => setIsLoading(false))
  }, [])

  const listItem = ({ item }) => {
    const albumArt = item.image[3]['#text']
    const artistName = item.artist.name
    const trackName = item.name
    const playCount = item.playcount

    return (
      <NewListItem
        image={albumArt}
        title={trackName}
        subtitle={artistName}
        playCount={playCount}
      />
    )
  }

  const keyExtractor = useCallback(
    (item) => item + Math.random().toString(),
    []
  )

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatList
        data={topTracks}
        renderItem={listItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={listItemSeparator}
        ListFooterComponent={listFooter}
        style={styles.listContainer}
      />
    )
  }
}

export default TopTracksScreen

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingTop: 10,
    backgroundColor: myColors.white,
  },
  listFooter: {
    height: 20,
  },
  listItemSeparator: {
    backgroundColor: myColors.white,
    height: 10,
  },
})
