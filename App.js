import React, { useEffect } from 'react'
import { AppLoading } from 'expo'
import AppNavigator from './navigation/AppNavigator'
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { OverflowMenuProvider } from 'react-navigation-header-buttons'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import authReducer from './store/authReducer'
import scrobblesReducer from './store/scrobblesReducer'
import AsyncStorage from '@react-native-community/async-storage'

const roorReducer = combineReducers({
  auth: authReducer,
  scrobbles: scrobblesReducer,
})

const store = createStore(roorReducer, applyMiddleware(ReduxThunk))

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  })

  useEffect(() => {
    AsyncStorage.removeItem('spotifyToken')
    console.log('Spotify token is deleted on app start.')
    setTimeout(() => {
      AsyncStorage.removeItem('spotifyToken')
      console.log('Spotify token deleted (token is expired, 1 hour is passed.)')
    }, 60000 * 60)
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <OverflowMenuProvider>
          <AppNavigator />
        </OverflowMenuProvider>
      </Provider>
    )
  }
}
