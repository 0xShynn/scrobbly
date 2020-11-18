import React from 'react'
import { useCallback } from 'react'
import { FlatList, View, RefreshControl } from 'react-native'
import myColors from '../constants/myColors'
import CustomRefreshControl from './UI/CustomRefreshControl'

const listItemSeparator = () => <View style={{ height: 10 }} />

const listFooter = () => {
  return <View style={{ height: 30 }} />
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
      style={{
        backgroundColor: myColors.dark_gray,
        paddingVertical: 20,
        paddingHorizontal: 15,
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

export default FlatListItems
