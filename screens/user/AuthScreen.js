import React from 'react'
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
  StyleSheet,
  TextInput,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useForm, Controller } from 'react-hook-form'

import CenteredContainer from '../../components/UI/CenteredContainer'
import CustomButton from '../../components/UI/CustomButton'
import CustomText from '../../components/UI/CustomText'

import { useDispatch } from 'react-redux'
import * as authActions from '../../store/authActions'

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
  const isDarkTheme = useColorScheme() === 'dark' ? true : false
  const { control, handleSubmit, errors } = useForm()

  const authHandler = async (values) => {
    console.log(values)
    try {
      await dispatch(authActions.logIn(values.username, values.password))
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

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    autoCapitalize="none"
                    autoCompleteType="username"
                    placeholder="Enter your username"
                    placeholderTextColor="#999"
                    style={styles.textInput}
                  />
                )}
                name="username"
                rules={{ required: true }}
                defaultValue=""
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    secureTextEntry={true}
                    autoCompleteType="password"
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    style={styles.textInput}
                  />
                )}
                name="password"
                defaultValue=""
              />
            </View>
            <View
              style={{ paddingHorizontal: spacing.lg, marginTop: spacing.sm }}
            >
              <CustomButton
                label="Login"
                onPress={handleSubmit(authHandler)}
                themeColor="primary"
              />
            </View>

            <View style={{ paddingHorizontal: spacing.xl }}>
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

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#FFF',
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: spacing.xs,
  },
  inputContainer: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
})

export default AuthScreen
