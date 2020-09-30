import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import DetailsScreen from '../screens/DetailsScreen'

const Stack = createStackNavigator()

const DetailsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

export default DetailsStackScreen
