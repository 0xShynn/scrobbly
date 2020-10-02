import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../../utils/dayjs'

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
          <Text style={styles.date}>{timestamp}</Text>
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
    width: 80,
    height: 80,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 20,
  },
  artist: {
    fontSize: 15,
    marginBottom: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  nowPlaying: {
    marginRight: 20,
  },
  date: {
    color: '#666',
    backgroundColor: '#EEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    overflow: 'hidden',
  },
})
