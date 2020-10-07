import React from 'react'
import { AppLoading } from 'expo'
import AppNavigator from './navigation/AppNavigator'
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return <AppNavigator />
  }
}
