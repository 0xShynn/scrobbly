import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import ScrobbleDetailsScreen from '../screens/ScrobbleDetailsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'
import { defaultNavOptions } from './defaultNavOptions'

const Stack = createStackNavigator()

const DetailsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Details" component={ScrobbleDetailsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
    </Stack.Navigator>
  )
}

export default DetailsStackScreen
