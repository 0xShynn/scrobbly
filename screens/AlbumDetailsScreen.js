import React, { useCallback } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const itemList = ({ item, index }) => {
  return (
    <View style={styles.trackItem} key={index}>
      <Text style={styles.trackRank}>{item['@attr'].rank}</Text>
      <Text style={styles.trackName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.trackDuration}>{item.duration}</Text>
    </View>
  )
}

const AlbumDetailsScreen = (props) => {
  // console.log(props)

  const keyExtractor = useCallback(
    (item) => item + Math.random().toString(),
    []
  )

  const itemSeparator = () => <View style={styles.itemSeparator} />

  const albumTrackList = props.route.params.albumTrackList
  return (
    <View>
      <FlatList
        data={albumTrackList}
        renderItem={itemList}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        style={styles.flatList}
      />
    </View>
  )
}

export default AlbumDetailsScreen

const styles = StyleSheet.create({
  flatList: {
    padding: 30,
    height: '100%',
  },
  trackItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  trackRank: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 20,
  },
  trackName: {
    fontSize: 18,
    flex: 1,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#DDD',
  },
})
