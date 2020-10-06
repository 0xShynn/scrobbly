import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import DetailsScreen from '../screens/DetailsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'

const Stack = createStackNavigator()

const DetailsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
    </Stack.Navigator>
  )
}

export default DetailsStackScreen
