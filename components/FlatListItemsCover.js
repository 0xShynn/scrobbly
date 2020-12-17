import React, { useCallback, forwardRef } from 'react'
import { FlatList, View, RefreshControl } from 'react-native'
import myColors from '../constants/myColors'
import useColorScheme from '../hooks/useColorSchemeFix'
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

const FlatListItemsCover = forwardRef((props, ref) => {
  const keyExtractor = useCallback((item) => item.id, [])
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <FlatList
      ref={ref}
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
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
      refreshControl={
        <RefreshControl
          colors={['white', 'black']}
          tintColor={isDarkTheme ? 'white' : myColors.gray_900}
          onRefresh={props.onRefresh}
          refreshing={props.isRefreshing}
          enabled={true}
        />
      }
    />
  )
})

export default FlatListItemsCover
