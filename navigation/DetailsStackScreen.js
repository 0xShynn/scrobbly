import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import TopTracksScreen from '../screens/TopTracksScreen'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import DetailsScreen from './DetailsScreen'
import TopAlbumsScreen from '../screens/TopAlbumsScreen'

const Stack = createStackNavigator()

const DetailsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Artists" component={TopArtistsScreen} />
      <Stack.Screen name="Albums" component={TopAlbumsScreen} />
      <Stack.Screen name="Track" component={TopTracksScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

export default DetailsStackScreen
