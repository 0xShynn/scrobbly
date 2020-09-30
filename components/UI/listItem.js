import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: props.image }} style={styles.coverArt} />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.artist}>
            {props.artist}
          </Text>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
        </View>
        {props.nowPlaying && (
          <View>
            <Ionicons
              name="ios-musical-notes"
              size={20}
              color="black"
              style={styles.nowPlaying}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ListItem

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
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
})
