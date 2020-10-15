import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextH6 } from '../components/UI/Typography'

const ArtistDetailsScreen = (props) => {
  const artistName = props.route.params.artist
  const playCount = props.route.params.playCount

  // Set the header title
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `${artistName}`,
    })
  }, [props.navigation])

  return (
    <View>
      <TextH6>{artistName}</TextH6>
      <TextH6>{playCount}</TextH6>
    </View>
  )
}

export default ArtistDetailsScreen

const styles = StyleSheet.create({})
