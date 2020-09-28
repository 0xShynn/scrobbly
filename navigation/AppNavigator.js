import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ScrobblesScreen from '../screens/ScrobblesScreen'

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <ScrobblesScreen />
    </NavigationContainer>
  )
}

export default AppNavigator
