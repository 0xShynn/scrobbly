import React from 'react'
import { Platform, useColorScheme } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SimpleLineIcons } from '@expo/vector-icons'
import myColors from '../constants/myColors'

import ScrobblesStackScreen from './ScrobblesStackScreen'
import TopAlbumsStackScreen from './TopAlbumsStackScreen'
import TopArtistsStackScreen from './TopArtistsStackScreen'
import TopTracksStackScreen from './TopTracksStackScreen'

const Tab = createBottomTabNavigator()

const MainBottomTabNavigator = () => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

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
        activeTintColor: isDarkTheme ? 'white' : myColors.cool_gray_700,
        inactiveTintColor: isDarkTheme
          ? myColors.cool_gray_600
          : myColors.cool_gray_400,
        inactiveBackgroundColor: isDarkTheme ? myColors.cool_gray_990 : 'white',
        activeBackgroundColor: isDarkTheme ? myColors.cool_gray_990 : 'white',
        labelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_700Bold',
        },
        style: {
          backgroundColor: isDarkTheme ? myColors.cool_gray_990 : 'white',
          borderTopColor: isDarkTheme ? myColors.cool_gray_900 : 'white',
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
    </Tab.Navigator>
  )
}

export default MainBottomTabNavigator
