import React, { useEffect, useState, useLayoutEffect } from 'react'
import { FlatList, View } from 'react-native'

import DetailsHeader from '../components/DetailsHeader'
import SimilarItem from '../components/SimilarItem'
import CustomText from '../components/UI/CustomText'

import myColors from '../constants/myColors'
import { getSimilarTracks } from '../utils/lastfm'

const TrackDetailsScreen = ({ route, navigation }) => {
  const { artistName, trackName, albumImage, playcount } = route.params
  const [similarTracks, setSimilarTracks] = useState([])

  const itemSelectHandler = (artist, title, image) => {
    navigation.push('Details', {
      artist,
      title,
      image,
    })
  }

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
      <SimilarItem
        title={item.trackName}
        subtitle={item.artistName}
        image={item.albumArt}
        onSelect={itemSelectHandler.bind(
          this,
          item.artistName,
          item.trackName,
          item.albumArt
        )}
      />
    )
  }

  const listHeader = () => {
    return (
      <>
        <DetailsHeader
          image={albumImage}
          title={trackName}
          subtitle={artistName}
          style={{ marginBottom: 40 }}
        />
        <View>
          <CustomText children={playcount} size="H6" />
          <CustomText children="From the Album" size="H3" bold />
        </View>
      </>
    )
  }

  return (
    <View style={{ backgroundColor: myColors.gray_1100, flex: 1 }}>
      <FlatList
        data={similarTracks}
        renderItem={itemList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        style={{ backgroundColor: myColors.gray_1100, padding: 20 }}
      />
    </View>
  )
}

export default TrackDetailsScreen
