import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { useDispatch } from 'react-redux'
import LoadingContainer from '../components/UI/LoadingContainer'
import myColors from '../constants/myColors'
import * as authActions from '../store/authActions'

const StartupScreen = () => {
  const dispatch = useDispatch()
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        dispatch(authActions.setDidTryAutoLogin())
        return
      }
      const { token, username } = JSON.parse(userData)
      dispatch(authActions.authenticate(username, token))
    }
    tryLogin()
  }, [dispatch])

  return <LoadingContainer />
}

export default StartupScreen
