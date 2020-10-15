import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TopArtistsScreen from '../screens/TopArtistsScreen'
import TopTracksScreen from '../screens/TopTracksScreen'

import { Ionicons } from '@expo/vector-icons'
import DetailsStackScreen from './DetailsStackScreen'
import TopAlbumsStackScreen from './TopAlbumsStackScreen'
import myColors from '../constants/myColors'
import MyAccountScreen from '../screens/MyAccountScreen'
import TopArtistsStackScreen from './TopArtistsStackScreen'
import TopTracksStackScreen from './TopTracksStackScreen'

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
              iconName = 'md-star'
              break
            case 'Albums':
              iconName = 'ios-disc'
              break
            case 'Tracks':
              iconName = 'ios-musical-notes'
              break
            case 'My Account':
              iconName = 'md-person'
              break
            default:
              iconName = 'ios-musical-note'
          }

          return <Ionicons name={iconName} size={30} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: myColors.primary,
        inactiveTintColor: myColors.blue_gray_500,
        labelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_400Regular',
        },
      }}
    >
      <Tab.Screen name="Scrobbles" component={DetailsStackScreen} />
      <Tab.Screen name="Albums" component={TopAlbumsStackScreen} />
      <Tab.Screen name="Artists" component={TopArtistsStackScreen} />
      <Tab.Screen name="Tracks" component={TopTracksStackScreen} />
      <Tab.Screen name="My Account" component={MyAccountScreen} />
    </Tab.Navigator>
  )
}

export default MainBottomTabNavigator
