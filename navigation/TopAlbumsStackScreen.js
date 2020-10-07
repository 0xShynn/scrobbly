import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopAlbumsScreen from '../screens/TopAlbumsScreen'

const Stack = createStackNavigator()

const TopAlbumsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top Albums" component={TopAlbumsScreen} />
    </Stack.Navigator>
  )
}

export default TopAlbumsStackScreen
