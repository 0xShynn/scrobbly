import React, { useState } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import AppNavigator from './navigation/AppNavigator'

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Black.ttf'),
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontsLoaded(true)
        }}
      />
    )
  }

  return <AppNavigator />
}
