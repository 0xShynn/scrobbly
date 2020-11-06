import React, { useEffect, useState, useLayoutEffect } from 'react'

import { FlatList, StyleSheet, Image, View } from 'react-native'
import DetailsHeader from '../components/DetailsHeader'
import { TextH5 } from '../components/UI/Typography'
import myColors from '../constants/myColors'
import { getSimilarTracks } from '../utils/lastfm'

const TrackDetailsScreen = ({ route, navigation }) => {
  const { artistName, trackName, albumImage } = route.params
  const [similarTracks, setSimilarTracks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSimilarTracks(artistName, trackName)
      setSimilarTracks(data)
    }
    fetchData()
  }, [])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistName} - ${trackName}`,
    })
  }, [navigation])

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
      <DetailsHeader
        image={albumImage}
        title={trackName}
        subtitle={artistName}
      />
    )
  }

  return (
    <View>
      <FlatList
        data={similarTracks}
        renderItem={itemList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        style={{ backgroundColor: myColors.dark_gray }}
      />
    </View>
  )
}

export default TrackDetailsScreen
