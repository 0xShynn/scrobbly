import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import DetailsScreen from '../screens/DetailsScreen'
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen'
import myColors from '../constants/myColors'

const Stack = createStackNavigator()

const DetailsStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: myColors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Inter_700Bold',
        },
      }}
    >
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
    </Stack.Navigator>
  )
}

export default DetailsStackScreen
