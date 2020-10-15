import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import { defaultNavOptions } from './defaultNavOptions'
import ArtistDetailsScreen from '../screens/ArtistDetailsScreen'

const Stack = createStackNavigator()

const TopArtistsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Top Artists" component={TopArtistsScreen} />
      <Stack.Screen name="Artist Details" component={ArtistDetailsScreen} />
    </Stack.Navigator>
  )
}

export default TopArtistsStackScreen
