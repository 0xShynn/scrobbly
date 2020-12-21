import React, { useCallback, forwardRef } from 'react'
import { FlatList, View, RefreshControl } from 'react-native'
import ListEmpty from './ListEmpty'

import myColors from '../constants/myColors'
import useColorScheme from '../hooks/useColorSchemeFix'

const listItemSeparator = () => <View style={{ height: 10 }} />
const listFooter = () => <View style={{ height: 40 }} />

const FlatListItems = forwardRef((props, ref) => {
  const keyExtractor = useCallback((item) => item.id, [])
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <FlatList
      ref={ref}
      data={props.data}
      renderItem={props.renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={listItemSeparator}
      ListHeaderComponent={props.ListHeaderComponent}
      ListFooterComponent={listFooter}
      ListEmptyComponent={ListEmpty}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
        paddingVertical: 20,
        paddingHorizontal: 15,
      }}
      refreshControl={
        <RefreshControl
          colors={['white', 'black']}
          tintColor={isDarkTheme ? 'white' : myColors.gray_300}
          onRefresh={props.onRefresh}
          refreshing={props.isRefreshing}
          enabled={true}
        />
      }
    />
  )
})

export default FlatListItems
