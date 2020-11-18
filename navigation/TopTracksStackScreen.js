import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { defaultNavOptions } from './defaultNavOptions'
import TopTracksScreen from '../screens/TopTracksScreen'
import TrackDetailsScreen from '../screens/TrackDetailsScreen'
import ScrobbleDetailsScreen from '../screens/ScrobbleDetailsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'
import BiographyDetailsScreen from '../screens/BiographyDetailsScreen'

const Stack = createStackNavigator()

const TopTracksStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Top Tracks" component={TopTracksScreen} />
      <Stack.Screen name="Track Details" component={TrackDetailsScreen} />
      <Stack.Screen name="Scrobble Details" component={ScrobbleDetailsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
      <Stack.Screen
        name="Biography Details"
        component={BiographyDetailsScreen}
      />
    </Stack.Navigator>
  )
}

export default TopTracksStackScreen
