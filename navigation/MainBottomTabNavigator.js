import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import TopTracksScreen from '../screens/TopTracksScreen'

import { Ionicons } from '@expo/vector-icons'
import DetailsStackScreen from './DetailsStackScreen'
import TopAlbumsStackScreen from './TopAlbumsStackScreen'
import myColors from '../constants/myColors'

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
        activeTintColor: myColors.primary,
        inactiveTintColor: '#999',
        labelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_400Regular',
        },
      }}
    >
      <Tab.Screen name="Scrobbles" component={DetailsStackScreen} />
      <Tab.Screen name="Albums" component={TopAlbumsStackScreen} />
      <Tab.Screen name="Artists" component={TopArtistsScreen} />
      <Tab.Screen name="Tracks" component={TopTracksScreen} />
    </Tab.Navigator>
  )
}

export default MainBottomTabNavigator
