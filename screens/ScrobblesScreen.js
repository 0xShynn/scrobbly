import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, FlatList, Alert } from 'react-native'

import listItem from '../components/UI/listItem'

const ScrobblesScreen = () => {
  const [recentTracks, setRecentTracks] = useState([])
  const [error, setError] = useState()

  const getScrobblesHandler = async () => {
    const username = 'shynnobi'
    const api_key = process.env.API_KEY
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json`

    try {
      const response = await fetch(url)
      setError(null)

      if (!response.ok) {
        const errorResData = await response.json()
        setError(errorResData.message)
      }

      const resData = await response.json()
      const tracksArray = [...resData.recenttracks.track]
      setRecentTracks(tracksArray)
    } catch (errorInLog) {
      throw errorInLog
    }
  }

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'OK' }])
    }
  }, [error])

  return (
    <View style={styles.container}>
      <Button title="Get Scrobbles" onPress={getScrobblesHandler} />
      <FlatList
        data={recentTracks}
        renderItem={listItem}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />
        }}
      />
      <View style={styles.bottom}>
        <Button title="See more" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
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
