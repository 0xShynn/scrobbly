import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { abbreviateNumber } from '../utils/numbers'
import Badge from './UI/Badge'

const SimilarTrack = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.similarTrack}>
        <View style={styles.similarInfo}>
          <Text style={styles.similarTrackCounter}>{props.index + 1}</Text>
          <View style={styles.middle}>
            <Text numberOfLines={1} style={styles.similarInfoTitle}>
              {props.item.name}
            </Text>
            <Text numberOfLines={1} style={styles.similarInfoArtist}>
              {props.item.artist.name}
            </Text>
          </View>
          <View style={styles.similarTrackData}>
            <Badge>{abbreviateNumber(props.item.playcount)}</Badge>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SimilarTrack

const styles = StyleSheet.create({
  similarTrack: {},

  similarInfo: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  similarTrackCounter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingVertical: 4,
    color: '#999',
    fontWeight: 'bold',
    fontSize: 24,
  },
  similarInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  middle: {
    flex: 1,
    paddingRight: 10,
  },
  similarTrackData: {
    alignSelf: 'center',
  },
})
