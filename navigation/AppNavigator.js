import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainBottomTabNavigator from './MainBottomTabNavigator'
import AuthScreen from '../screens/user/AuthScreen'
import { useSelector } from 'react-redux'

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token)

  return (
    <NavigationContainer>
      {isAuth && <MainBottomTabNavigator />}
      {!isAuth && <AuthScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator
