import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import CenteredContainer from '../../components/UI/CenteredContainer'
import MyTextInput from '../../components/UI/MyTextInput'
import CustomButton from '../../components/UI/CustomButton'
import CustomText from '../../components/UI/CustomText'

import { useDispatch } from 'react-redux'
import * as authActions from '../../store/authActions'

import myColors from '../../constants/myColors'
import { useFormik } from 'formik'
import * as Yup from 'yup'

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
    <CenteredContainer style={{ backgroundColor: myColors.cool_gray_900 }}>
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
        <CustomText
          children="Doesn't have an last.fm account ? Sign Up"
          size="H6"
          complementaryStyle={{ textAlign: 'center', marginTop: 20 }}
        />
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
