import React, { useRef } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  useWindowDimensions,
  Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import CenteredContainer from '../../components/UI/CenteredContainer'
import MyTextInput from '../../components/UI/MyTextInput'
import CustomButton from '../../components/UI/CustomButton'
import CustomText from '../../components/UI/CustomText'

import { useDispatch } from 'react-redux'
import * as authActions from '../../store/authActions'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import useColorScheme from '../../hooks/useColorSchemeFix'
import myColors from '../../constants/myColors'
import spacing from '../../constants/spacing'

const authValidationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

const AuthScreen = () => {
  const dispatch = useDispatch()
  const password = useRef(null)
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

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
      Alert.alert('Error', error.message, [{ text: 'OK' }])
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <CenteredContainer
        style={{
          backgroundColor: isDarkTheme ? myColors.gray_1000 : myColors.gray_100,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{
              width: '100%',
              height: useWindowDimensions().height,
              justifyContent: 'center',
              paddingVertical: spacing.xl,
            }}
          >
            <StatusBar
              barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/icon.png')}
                style={{
                  width: 80,
                  height: 80,
                  marginBottom: spacing.sm,
                }}
              />
              <CustomText
                size="H2"
                bold
                color={isDarkTheme ? 'white' : myColors.gray_900}
                complementaryStyle={{ marginBottom: 40 }}
              >
                Scrobbly
              </CustomText>
              <CustomText
                size="H4"
                bold
                children="Log in with your Last.fm account"
                color={isDarkTheme ? 'white' : myColors.gray_900}
                complementaryStyle={{ marginBottom: spacing.xl }}
              />
            </View>
            <View
              style={{
                marginBottom: spacing.xs,
                paddingHorizontal: spacing.xl,
              }}
            >
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
            <View
              style={{
                marginBottom: spacing.md,
                paddingHorizontal: spacing.xl,
              }}
            >
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
            <View style={{ paddingHorizontal: spacing.xl }}>
              <CustomButton
                label="Login"
                onPress={handleSubmit}
                themeColor="primary"
              />
              <CustomText
                children="Doesn't have an last.fm account ? Sign Up"
                size="H6"
                color={isDarkTheme ? myColors.gray_500 : myColors.gray_900}
                complementaryStyle={{
                  textAlign: 'center',
                  marginTop: 30,
                }}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </CenteredContainer>
    </KeyboardAvoidingView>
  )
}

export default AuthScreen
