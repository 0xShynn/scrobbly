import React from 'react'
import { RefreshControl } from 'react-native'

export default function CustomRefreshControl(props) {
  return (
    <RefreshControl
      colors={['white', 'black']}
      tintColor="white"
      onRefresh={props.onRefresh}
      refreshing={props.isRefreshing}
      enabled={true}
    />
  )
}
