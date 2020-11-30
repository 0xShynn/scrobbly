import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SimpleLineIcons } from '@expo/vector-icons'
import myColors from '../constants/myColors'

import ScrobblesStackScreen from './ScrobblesStackScreen'
import TopAlbumsStackScreen from './TopAlbumsStackScreen'
import TopArtistsStackScreen from './TopArtistsStackScreen'
import TopTracksStackScreen from './TopTracksStackScreen'
import MyAccountStackScreen from './MyAccountStackScreen'
import { Platform } from 'react-native'

const Tab = createBottomTabNavigator()

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName

          switch (route.name) {
            case 'Scrobbles':
              iconName = 'playlist'
              break
            case 'Home':
              iconName = 'home'
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
        activeTintColor: 'white',
        inactiveTintColor: myColors.cool_gray_600,
        inactiveBackgroundColor: myColors.cool_gray_990,
        activeBackgroundColor: myColors.cool_gray_990,
        labelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_700Bold',
        },
        style: {
          backgroundColor: myColors.cool_gray_990,
          borderTopColor: myColors.cool_gray_900,
          height: Platform.OS === 'android' ? '8%' : '10%',
        },
        tabStyle: {
          paddingVertical: 6,
        },
      }}
    >
      <Tab.Screen name="Scrobbles" component={ScrobblesStackScreen} />
      <Tab.Screen name="Albums" component={TopAlbumsStackScreen} />
      <Tab.Screen name="Tracks" component={TopTracksStackScreen} />
      <Tab.Screen name="Artists" component={TopArtistsStackScreen} />
      <Tab.Screen name="My Account" component={MyAccountStackScreen} />
    </Tab.Navigator>
  )
}

export default MainBottomTabNavigator
