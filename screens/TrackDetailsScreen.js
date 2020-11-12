import React, { useEffect, useState, useLayoutEffect } from 'react'

import { FlatList, View } from 'react-native'
import DetailsHeader from '../components/DetailsHeader'
import SimilarTrack from '../components/SimilarTrack'
import { TextH6, TitleH3 } from '../components/UI/Typography'
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
      <SimilarTrack
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
          <TextH6>{playcount}</TextH6>
          <TitleH3>From the Album</TitleH3>
        </View>
      </>
    )
  }

  return (
    <View style={{ backgroundColor: myColors.dark_gray, flex: 1 }}>
      <FlatList
        data={similarTracks}
        renderItem={itemList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        style={{ backgroundColor: myColors.dark_gray, padding: 20 }}
      />
    </View>
  )
}

export default TrackDetailsScreen
