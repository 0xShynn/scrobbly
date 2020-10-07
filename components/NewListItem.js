import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../utils/dayjs'
import Badge from './UI/Badge'

const NewListItem = (props) => {
  const date = props.date ? props.date['#text'] : null
  const timestamp = dayjs(date).utc(true).fromNow()

  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: props.image }} style={styles.coverArt} />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {props.artist}
          </Text>
        </View>
        {props.nowPlaying ? (
          <View>
            <Ionicons
              name="ios-musical-notes"
              size={20}
              color="black"
              style={styles.nowPlaying}
            />
          </View>
        ) : (
          <Badge>{timestamp}</Badge>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default NewListItem

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingRight: 10,
  },
  coverArt: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 20,
  },
  artist: {
    fontSize: 14,
    marginBottom: 3,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  nowPlaying: {
    marginRight: 20,
  },
})
