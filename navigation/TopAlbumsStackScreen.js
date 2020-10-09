import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopAlbumsScreen from '../screens/TopAlbumsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'

const Stack = createStackNavigator()

const TopAlbumsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top Albums" component={TopAlbumsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
    </Stack.Navigator>
  )
}

export default TopAlbumsStackScreen
