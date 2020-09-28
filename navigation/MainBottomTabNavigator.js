import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ScrobblesScreen from '../screens/ScrobblesScreen'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import TopAlbumsScreen from '../screens/TopAlbumsScreen'
import TopTracksScreen from '../screens/TopTracksScreen'

import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName

          switch (route.name) {
            case 'Scrobbles':
              iconName = 'ios-list'
              break
            case 'Top Artists':
              iconName = 'md-person'
              break
            case 'Top Albums':
              iconName = 'ios-disc'
              break
            case 'Top Tracks':
              iconName = 'ios-musical-notes'
              break
            default:
              iconName = 'ios-musical-note'
          }

          return <Ionicons name={iconName} size={30} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Tab.Screen name="Top Artists" component={TopArtistsScreen} />
      <Tab.Screen name="Top Albums" component={TopAlbumsScreen} />
      <Tab.Screen name="Top Tracks" component={TopTracksScreen} />
    </Tab.Navigator>
  )
}

export default MainBottomTabNavigator
