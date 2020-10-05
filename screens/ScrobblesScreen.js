import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, StyleSheet, FlatList, Alert, StatusBar } from 'react-native'

import LoadingContainer from '../components/UI/LoadingContainer'
import NewListItem from '../components/NewListItem'
import { api_key, baseUrl, username } from '../utils/lastfm'

const ScrobblesScreen = (props) => {
  const [recentTracks, setRecentTracks] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

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
    getScrobblesHandler().then(() => {
      setIsLoading(false)
    })
  }, [getScrobblesHandler, setIsLoading])

  const onSelectHandler = (artist, title, image) => {
    props.navigation.navigate('Details', {
      artist,
      title,
      image,
    })
  }

  const renderItem = useCallback(
    ({ item }) => (
      <NewListItem
        image={item.image[3]['#text']}
        artist={item.artist['#text']}
        title={item.name}
        nowPlaying={item['@attr'] ? item['@attr'] : false}
        date={item.date}
        onSelect={() => {
          onSelectHandler(
            item.artist['#text'],
            item.name,
            item.image[3]['#text']
          )
        }}
      />
    ),
    []
  )

  const keyExtractor = useCallback(
    (item) => item.name + Math.random().toString(),
    []
  )

  const itemSeparator = () => <View style={styles.separator} />

  if (isLoading) {
    return <LoadingContainer />
  }

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <FlatList
          data={recentTracks}
          initialNumToRender={10}
          renderItem={renderItem}
          onRefresh={getScrobblesHandler}
          refreshing={isRefreshing}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparator}
          style={styles.listContainer}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: { width: '100%' },
  separator: {
    backgroundColor: '#FFF',
    height: 1,
  },
  bottom: {
    flex: 1,
    backgroundColor: 'red',
  },
})

export default ScrobblesScreen
