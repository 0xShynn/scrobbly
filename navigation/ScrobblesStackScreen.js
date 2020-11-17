import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import ScrobbleDetailsScreen from '../screens/ScrobbleDetailsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'
import BiographyDetailsScreen from '../screens/BiographyDetailsScreen'
import { defaultNavOptions } from './defaultNavOptions'

const Stack = createStackNavigator()

const ScrobblesStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Scrobble Details" component={ScrobbleDetailsScreen} />
      <Stack.Screen
        name="Biography Details"
        component={BiographyDetailsScreen}
      />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
    </Stack.Navigator>
  )
}

export default ScrobblesStackScreen
