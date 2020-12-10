import React, { useCallback } from 'react'
import { FlatList, View, RefreshControl, useColorScheme } from 'react-native'
import myColors from '../constants/myColors'

const listItemSeparator = () => <View style={{ height: 10 }} />

const listFooter = () => {
  return <View style={{ height: 40 }} />
}

const FlatListItems = (props) => {
  const keyExtractor = useCallback((item) => item.id, [])
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={listItemSeparator}
      ListFooterComponent={listFooter}
      ListHeaderComponent={props.ListHeaderComponent}
      style={{
        backgroundColor: isDarkTheme
          ? myColors.dark_gray
          : myColors.cool_gray_100,
        paddingVertical: 20,
        paddingHorizontal: 15,
      }}
      refreshControl={
        <RefreshControl
          colors={['white', 'black']}
          tintColor={isDarkTheme ? 'white' : myColors.cool_gray_300}
          onRefresh={props.onRefresh}
          refreshing={props.isRefreshing}
          enabled={true}
        />
      }
    />
  )
}

export default FlatListItems
