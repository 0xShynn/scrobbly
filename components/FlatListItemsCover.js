import React, { useCallback } from 'react'
import { FlatList, View, RefreshControl, useColorScheme } from 'react-native'
import myColors from '../constants/myColors'
import CustomText from './UI/CustomText'

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
      <CustomText size="H6">No items found. Start scrobbling!</CustomText>
    </View>
  )
}

const FlatListItemsCover = (props) => {
  const keyExtractor = useCallback((item) => item.id, [])
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

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
        backgroundColor: isDarkTheme
          ? myColors.dark_gray
          : myColors.cool_gray_100,
      }}
      refreshControl={
        <RefreshControl
          colors={['white', 'black']}
          tintColor={isDarkTheme ? 'white' : myColors.cool_gray_900}
          onRefresh={props.onRefresh}
          refreshing={props.isRefreshing}
          enabled={true}
        />
      }
    />
  )
}

export default FlatListItemsCover
