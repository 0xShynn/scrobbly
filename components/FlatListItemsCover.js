import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { TextH6 } from './UI/Typography'

const listItemSeparator = () => <View style={{ height: 12 }} />

const listFooter = () => {
  return <View style={{ height: 40 }} />
}

const listEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 520,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextH6>No items found. Start scrobbling!</TextH6>
    </View>
  )
}

const FlatListItemsCover = (props) => {
  const keyExtractor = useCallback((item) => item.id, [])

  return (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      ItemSeparatorComponent={listItemSeparator}
      ListFooterComponent={listFooter}
      ListEmptyComponent={listEmpty}
      keyExtractor={keyExtractor}
      horizontal={false}
      numColumns={2}
      onRefresh={props.onRefresh}
      refreshing={props.isRefreshing}
      style={{ paddingHorizontal: 4, paddingVertical: 20 }}
    />
  )
}

export default FlatListItemsCover
