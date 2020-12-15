import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SimpleLineIcons } from '@expo/vector-icons'
import myColors from '../constants/myColors'

import ScrobblesStackScreen from './ScrobblesStackScreen'
import TopAlbumsStackScreen from './TopAlbumsStackScreen'
import TopArtistsStackScreen from './TopArtistsStackScreen'
import TopTracksStackScreen from './TopTracksStackScreen'
import useColorScheme from '../hooks/useColorSchemeFix'

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
        activeTintColor: isDarkTheme ? 'white' : myColors.gray_1000,
        inactiveTintColor: isDarkTheme ? myColors.gray_600 : myColors.gray_400,
        inactiveBackgroundColor: isDarkTheme ? myColors.gray_1000 : 'white',
        activeBackgroundColor: isDarkTheme ? myColors.gray_1000 : 'white',
        labelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_700Bold',
        },
        style: {
          backgroundColor: isDarkTheme ? myColors.gray_1000 : 'white',
          borderTopWidth: 1,
          borderTopColor: isDarkTheme ? myColors.gray_950 : myColors.gray_100,
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
