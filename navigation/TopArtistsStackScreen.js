import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import { defaultNavOptions } from './defaultNavOptions'
import ArtistDetailsScreen from '../screens/ArtistDetailsScreen'
import BiographyDetailsScreen from '../screens/BiographyDetailsScreen'

const Stack = createStackNavigator()

const TopArtistsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Top Artists" component={TopArtistsScreen} />
      <Stack.Screen name="Artist Details" component={ArtistDetailsScreen} />
      <Stack.Screen
        name="Biography Details"
        component={BiographyDetailsScreen}
      />
    </Stack.Navigator>
  )
}

export default TopArtistsStackScreen
