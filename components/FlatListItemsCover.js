import React, { useCallback } from 'react'
import { FlatList, View, RefreshControl } from 'react-native'
import { TextH6 } from './UI/Typography'
import myColors from '../constants/myColors'

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
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: myColors.dark_gray,
      }}
      refreshControl={
        <RefreshControl
          colors={['white', 'black']}
          tintColor="white"
          onRefresh={props.onRefresh}
          refreshing={props.isRefreshing}
          enabled={true}
        />
      }
    />
  )
}

export default FlatListItemsCover
