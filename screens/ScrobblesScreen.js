import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Alert, StatusBar } from 'react-native'

import LoadingContainer from '../components/UI/LoadingContainer'
import NewListItem from '../components/UI/NewListItem'
import { api_key, baseUrl, username } from '../utils/lastfm'

const ScrobblesScreen = (props) => {
  const [recentTracks, setRecentTracks] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getScrobblesHandler = useCallback(async () => {
    const getRecentTracks = `?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json&limit=50`
    setIsRefreshing(true)
    setError(null)

    try {
      const response = await fetch(baseUrl + getRecentTracks)

      if (!response.ok) {
        const errorResData = await response.json()
        setError(errorResData.message)
      }

      const resData = await response.json()
      setRecentTracks(resData.recenttracks.track)
      // console.log(recentTracks)
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

  if (isLoading) {
    return <LoadingContainer />
  }

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <FlatList
          onRefresh={getScrobblesHandler}
          refreshing={isRefreshing}
          data={recentTracks}
          renderItem={(itemData) => (
            <NewListItem
              image={itemData.item.image[3]['#text']}
              artist={itemData.item.artist['#text']}
              title={itemData.item.name}
              nowPlaying={
                itemData.item['@attr'] ? itemData.item['@attr'] : false
              }
              date={itemData.item.date}
              onSelect={() => {
                onSelectHandler(
                  itemData.item.artist['#text'],
                  itemData.item.name,
                  itemData.item.image[3]['#text']
                )
              }}
            />
          )}
          initialNumToRender={10}
          keyExtractor={(item) => item.name + Math.random().toString()}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />
          }}
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
