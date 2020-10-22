import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainBottomTabNavigator from './MainBottomTabNavigator'
import AuthScreen from '../screens/user/AuthScreen'

const AppNavigator = () => {
  const isAuth = false

  return (
    <NavigationContainer>
      {isAuth && <MainBottomTabNavigator />}
      {!isAuth && <AuthScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator
