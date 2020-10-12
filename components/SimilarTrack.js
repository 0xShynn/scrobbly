import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { abbreviateNumber } from '../utils/numbers'
import Badge from './UI/Badge'
import { TextH6, TextH2, TitleH5 } from './UI/Typography'

const SimilarTrack = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.info}>
        <TextH2 style={styles.rank} children={props.index + 1} />
        <View style={styles.titles}>
          <TitleH5 numberOfLines={1} children={props.item.name} />
          <TextH6 numberOfLines={1} children={props.item.artist.name} />
        </View>
        <View>
          <Badge>{abbreviateNumber(props.item.playcount)}</Badge>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SimilarTrack

const styles = StyleSheet.create({
  info: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  rank: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingVertical: 4,
  },
  titles: {
    flex: 1,
    paddingRight: 10,
  },
})
