import React from 'react'
import { Button, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import CenteredContainer from '../components/UI/CenteredContainer'
import CustomButton from '../components/UI/CustomButton'
import { TextH6 } from '../components/UI/Typography'

import * as authActions from '../store/authActions'

const MyAccountScreen = (props) => {
  const dispatch = useDispatch()

  const logOutHandler = async () => {
    dispatch(authActions.logOut())
  }

  return (
    <CenteredContainer>
      <TextH6 style={{ marginBottom: 20 }}>My Account</TextH6>
      <CustomButton label="Logout" onPress={logOutHandler} />
    </CenteredContainer>
  )
}

export default MyAccountScreen

const styles = StyleSheet.create({})
