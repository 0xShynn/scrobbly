import React from 'react'
import { Button, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import CenteredContainer from '../components/UI/CenteredContainer'
import { TextH6 } from '../components/UI/Typography'

import * as authActions from '../store/authActions'

const MyAccountScreen = (props) => {
  const dispatch = useDispatch()

  const logOutHandler = async () => {
    dispatch(authActions.logOut())
  }

  return (
    <CenteredContainer>
      <TextH6>My Account</TextH6>
      <Button title="Logout" onPress={logOutHandler} />
    </CenteredContainer>
  )
}

export default MyAccountScreen

const styles = StyleSheet.create({})
