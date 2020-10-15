import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextH6 } from '../components/UI/Typography'

const ArtistDetailsScreen = (props) => {
  return (
    <View>
      <TextH6>{props.artistName}</TextH6>
    </View>
  )
}

export default ArtistDetailsScreen

const styles = StyleSheet.create({})
