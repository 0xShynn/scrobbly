import React, { useEffect, useState } from 'react'

import { FlatList, StyleSheet, Image, View } from 'react-native'
import { TextH5 } from '../components/UI/Typography'
import { getSimilarTracks } from '../utils/lastfm'

const TrackDetailsScreen = ({ route }) => {
  const { artistName, trackName, albumImage } = route.params
  const [similarTracks, setSimilarTracks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSimilarTracks(artistName, trackName)
      setSimilarTracks(data)
    }
    fetchData()
  }, [])

  const itemList = ({ item }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <TextH5>{item.artistName}</TextH5>
        <TextH5>{item.trackName}</TextH5>
        <Image
          source={{ uri: item.albumArt }}
          style={{ width: 80, height: 80, borderRadius: 6 }}
        />
      </View>
    )
  }

  const listHeader = () => {
    return (
      <View
        style={{ justifyContent: 'center', alignItems: 'center', padding: 30 }}
      >
        <TextH5>{artistName}</TextH5>
        <TextH5>{trackName}</TextH5>
        <Image
          source={{ uri: albumImage }}
          style={{ width: 180, height: 180, borderRadius: 10, marginTop: 20 }}
        />
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={similarTracks}
        renderItem={itemList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
      />
    </View>
  )
}

export default TrackDetailsScreen

const styles = StyleSheet.create({})
