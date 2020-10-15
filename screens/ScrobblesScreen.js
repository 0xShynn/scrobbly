import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Alert, StatusBar } from 'react-native'

import LoadingContainer from '../components/UI/LoadingContainer'
import NewListItem from '../components/NewListItem'
import { api_key, baseUrl, username } from '../utils/lastfm'
import myColors from '../constants/myColors'

const listFooter = () => {
  return <View style={styles.listFooter}></View>
}

const ScrobblesScreen = (props) => {
  const [recentTracks, setRecentTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()

  const getScrobblesHandler = useCallback(async () => {
    const getRecentTracks = `?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json&limit=50&page=1`
    setIsRefreshing(true)
    setError(null)

    try {
      const response = await fetch(baseUrl + getRecentTracks)

      const resData = await response.json()
      setRecentTracks(resData.recenttracks.track)
      setIsRefreshing(false)
    } catch (errorInLog) {
      throw errorInLog
    }
  }, [getScrobblesHandler, setError, setIsLoading, setIsRefreshing])

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'OK' }])
    }
  }, [error])

  useEffect(() => {
    setIsLoading(true)
    getScrobblesHandler().then(() => setIsLoading(false))
  }, [getScrobblesHandler, setIsLoading])

  const itemSelectHandler = (artist, title, image, album) => {
    props.navigation.navigate('Details', {
      artist,
      title,
      image,
      album,
    })
  }

  const listItem = useCallback(({ item }) => {
    const albumArt = item.image[3]['#text']
    const albumName = item.album['#text']
    const artistName = item.artist['#text']
    const trackName = item.name
    const isNowPlaying = item['@attr']
    const date = item.date

    return (
      <NewListItem
        image={albumArt}
        title={trackName}
        subtitle={artistName}
        nowPlaying={isNowPlaying ? isNowPlaying : false}
        date={date}
        onSelect={itemSelectHandler.bind(
          this,
          artistName,
          trackName,
          albumArt,
          albumName
        )}
      />
    )
  }, [])

  const keyExtractor = useCallback(
    (item) => item.name + Math.random().toString(),
    []
  )

  const listItemSeparator = () => <View style={styles.listItemSeparator} />

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={myColors.primary}
        />
        <FlatList
          data={recentTracks}
          initialNumToRender={10}
          renderItem={listItem}
          onRefresh={getScrobblesHandler}
          refreshing={isRefreshing}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={listItemSeparator}
          ListFooterComponent={listFooter}
          style={styles.listContainer}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.white,
  },
  listContainer: {
    width: '100%',
    paddingTop: 10,
  },
  listFooter: {
    height: 20,
  },
  listItemSeparator: {
    backgroundColor: myColors.white,
    height: 10,
  },
})

export default ScrobblesScreen
