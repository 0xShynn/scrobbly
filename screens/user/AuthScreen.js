import React, { useRef } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CenteredContainer from '../../components/UI/CenteredContainer'
import myColors from '../../constants/myColors'
import MyTextInput from '../../components/UI/MyTextInput'
import CustomButton from '../../components/UI/CustomButton'

const authValidationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

const AuthScreen = (props) => {
  const password = useRef(null)

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: authValidationSchema,
      initialValues: { username: '', password: '' },
      onSubmit: (values) => {
        Alert.alert(
          `username: ${values.username}, password: ${values.password}`
        )
      },
    }
  )

  return (
    <CenteredContainer style={{ backgroundColor: myColors.blue_gray_800 }}>
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
            returnKeyType="next"
            returnKeyLabel="next"
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
        <View style={{ alignItems: 'center' }}>
          <CustomButton label="Login" onPress={handleSubmit} />
        </View>
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
