import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { defaultNavOptions } from './defaultNavOptions'
import MyAccountScreen from '../screens/MyAccountScreen'

const Stack = createStackNavigator()

const MyAccountStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="My Account" component={MyAccountScreen} />
    </Stack.Navigator>
  )
}

export default MyAccountStackScreen
