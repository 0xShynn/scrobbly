import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CenteredContainer from '../components/UI/CenteredContainer'
import * as authActions from '../store/authActions'

const StartupScreen = () => {
  const dispatch = useDispatch()

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

  return (
    <CenteredContainer style={{ backgroundColor: 'red' }}>
      <Text>EN TRAIN DE AUTOLOGINNNN!</Text>
    </CenteredContainer>
  )
}

export default StartupScreen

const styles = StyleSheet.create({})
