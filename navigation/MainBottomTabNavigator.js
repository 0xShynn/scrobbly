import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import TopAlbumsScreen from '../screens/TopAlbumsScreen'
import TopTracksScreen from '../screens/TopTracksScreen'

import { Ionicons } from '@expo/vector-icons'
import DetailsStackScreen from './DetailsStackScreen'

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
            case 'Artists':
              iconName = 'md-person'
              break
            case 'Albums':
              iconName = 'ios-disc'
              break
            case 'Tracks':
              iconName = 'ios-musical-notes'
              break
            default:
              iconName = 'ios-musical-note'
          }

          return <Ionicons name={iconName} size={30} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Scrobbles" component={DetailsStackScreen} />
      <Tab.Screen name="Artists" component={TopArtistsScreen} />
      <Tab.Screen name="Albums" component={TopAlbumsScreen} />
      <Tab.Screen name="Tracks" component={TopTracksScreen} />
    </Tab.Navigator>
  )
}

export default MainBottomTabNavigator
