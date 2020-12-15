import React from 'react'
import { View } from 'react-native'
import CenteredContainer from './CenteredContainer'
import { SimpleLineIcons } from '@expo/vector-icons'
import myColors from '../../constants/myColors'
import CustomText from './CustomText'
import useColorScheme from '../../hooks/useColorSchemeFix'
import CustomButton from './CustomButton'
import spacing from '../../constants/spacing'

const ErrorContainer = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <CenteredContainer
      style={{
        padding: 30,
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDarkTheme ? myColors.gray_1000 : 'white',
          borderWidth: isDarkTheme ? 0 : 1,
          borderColor: isDarkTheme ? 'black' : myColors.gray_200,
          padding: 30,
          borderRadius: 20,
        }}
      >
        <SimpleLineIcons name="support" size={36} color={myColors.primary} />
        <CustomText
          children="Oops, something wrong has happened."
          size="H3"
          bold
          color={myColors.primary}
          complementaryStyle={{
            marginVertical: spacing.lg,
            textAlign: 'center',
          }}
        />
        <CustomText
          children={props.error}
          size="H6"
          color={isDarkTheme ? myColors.gray_100 : myColors.gray_900}
          complementaryStyle={{ marginBottom: spacing.lg }}
        />
        <CustomButton label="Retry" onPress={props.retryFunc} />
      </View>
    </CenteredContainer>
  )
}

export default ErrorContainer
