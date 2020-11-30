import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { defaultNavOptions } from './defaultNavOptions'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import ArtistDetailsScreen from '../screens/ArtistDetailsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'
import ScrobbleDetailsScreen from '../screens/ScrobbleDetailsScreen'
import BiographyScreen from '../screens/BiographyScreen'

const Stack = createStackNavigator()

const TopArtistsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Top Artists" component={TopArtistsScreen} />
      <Stack.Screen name="Artist Details" component={ArtistDetailsScreen} />
      <Stack.Screen name="Scrobble Details" component={ScrobbleDetailsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
      <Stack.Screen name="Biography" component={BiographyScreen} />
    </Stack.Navigator>
  )
}

export default TopArtistsStackScreen
