import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import CenteredContainer from '../../components/UI/CenteredContainer'
import MyTextInput from '../../components/UI/MyTextInput'
import CustomButton from '../../components/UI/CustomButton'
import { TextH6 } from '../../components/UI/Typography'
import myColors from '../../constants/myColors'

import { useDispatch } from 'react-redux'
import * as authActions from '../../store/authActions'

const authValidationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

const AuthScreen = (props) => {
  const dispatch = useDispatch()
  const password = useRef(null)

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: authValidationSchema,
      initialValues: { username: '', password: '' },
      onSubmit: (values) => {
        authHandler(values.username, values.password)
      },
    }
  )

  const authHandler = async (username, password) => {
    try {
      await dispatch(authActions.logIn(username, password))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CenteredContainer style={{ backgroundColor: myColors.blue_gray_900 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.inputSpacing}>
          <MyTextInput
            icon="ios-person"
            placeholder="Enter your username"
            autoCapitalize="none"
            autoCompleteType="username"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            error={errors.username}
            touched={touched.username}
            onSubmitEditing={() => {
              password.current?.focus()
            }}
          />
        </View>
        <View style={styles.inputSpacing}>
          <MyTextInput
            icon="md-lock"
            placeholder="Enter your password"
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry
            returnKeyType="go"
            returnKeyLabel="go"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            ref={password}
            onSubmitEditing={() => {
              handleSubmit()
            }}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <CustomButton label="Login" onPress={handleSubmit} />
        </View>
        <TextH6 style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
          Doesn't have an last.fm account ? Sign Up
        </TextH6>
      </View>
    </CenteredContainer>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  inputSpacing: {
    marginBottom: 20,
  },
})
