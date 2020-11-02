import React from 'react'
import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import myColors from '../constants/myColors'

const listItemSeparator = () => <View style={styles.listItemSeparator} />

const listFooter = () => {
  return <View style={styles.listFooter} />
}

const FlatListItems = (props) => {
  const keyExtractor = useCallback((item) => item.id, [])

  return (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={listItemSeparator}
      ListFooterComponent={listFooter}
      ListHeaderComponent={props.ListHeaderComponent}
      onRefresh={props.onRefresh}
      refreshing={props.isRefreshing}
      style={styles.listContainer}
    />
  )
}

export default FlatListItems

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingTop: 10,
    backgroundColor: myColors.white,
  },
  listFooter: {
    height: 20,
  },
  listItemSeparator: {
    backgroundColor: myColors.white,
    height: 10,
  },
})
