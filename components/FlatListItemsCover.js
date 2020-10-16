import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const listItemSeparator = () => <View style={styles.listItemSeparator} />

const listFooter = () => {
  return <View style={styles.listFooter} />
}

const FlatListItemsCover = (props) => {
  const keyExtractor = useCallback(
    (item) => item + Math.random().toString(),
    []
  )

  return (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      ItemSeparatorComponent={listItemSeparator}
      ListFooterComponent={listFooter}
      keyExtractor={keyExtractor}
      horizontal={false}
      numColumns={2}
      onRefresh={props.onRefresh}
      refreshing={props.isRefreshing}
      style={styles.listContainer}
    />
  )
}

export default FlatListItemsCover

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 4,
    paddingTop: 20,
    paddingBottom: 20,
  },
  listFooter: {
    height: 40,
  },
  listItemSeparator: {
    height: 12,
  },
})
