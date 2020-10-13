import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import DetailsScreen from '../screens/DetailsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'
import myColors from '../constants/myColors'
import { defaultNavOptions } from './defaultNavOptions'

const Stack = createStackNavigator()

const DetailsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
    </Stack.Navigator>
  )
}

export default DetailsStackScreen
