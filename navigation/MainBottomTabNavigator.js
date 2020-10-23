import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SimpleLineIcons } from '@expo/vector-icons'

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
              iconName = 'list'
              break
            case 'Artists':
              iconName = 'star'
              break
            case 'Albums':
              iconName = 'disc'
              break
            case 'Tracks':
              iconName = 'music-tone-alt'
              break
            case 'My Account':
              iconName = 'user'
              break
            default:
              iconName = 'music-tone-alt'
          }

          return <SimpleLineIcons name={iconName} size={26} color={color} />
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
