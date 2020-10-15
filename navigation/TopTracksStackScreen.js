import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { defaultNavOptions } from './defaultNavOptions'
import TopTracksScreen from '../screens/TopTracksScreen'
import TrackDetailsScreen from '../screens/TrackDetailsScreen'

const Stack = createStackNavigator()

const TopTracksStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Top Tracks" component={TopTracksScreen} />
      <Stack.Screen name="Track Details" component={TrackDetailsScreen} />
    </Stack.Navigator>
  )
}

export default TopTracksStackScreen
