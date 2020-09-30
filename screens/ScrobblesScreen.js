import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native'

import ListItem from '../components/UI/ListItem'
import { api_key, baseUrl, username } from '../utils/lastfm'

const ScrobblesScreen = (props) => {
  const [recentTracks, setRecentTracks] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getScrobblesHandler = useCallback(async () => {
    const getRecentTracks = `?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json&limit=30`
    setIsRefreshing(true)
    setError(null)

    try {
      const response = await fetch(baseUrl + getRecentTracks)

      if (!response.ok) {
        const errorResData = await response.json()
        setError(errorResData.message)
      }

      const resData = await response.json()
      const tracksArray = [...resData.recenttracks.track]
      setRecentTracks(tracksArray)
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

  const onSelectHandler = (artist, title) => {
    props.navigation.navigate('Details', {
      detailsArtist: artist,
      detailsTitle: title,
    })
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          onRefresh={getScrobblesHandler}
          refreshing={isRefreshing}
          data={recentTracks}
          renderItem={(itemData) => (
            <ListItem
              image={itemData.item.image[2]['#text']}
              artist={itemData.item.artist['#text']}
              title={itemData.item.name}
              nowPlaying={itemData.item['@attr']}
              onSelect={() => {
                onSelectHandler(
                  itemData.item.artist['#text'],
                  itemData.item.name
                )
              }}
            />
          )}
          keyExtractor={(item, index) => {
            item[index]
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />
          }}
          style={styles.listContainer}
        />
      )}
    </View>
  )
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
