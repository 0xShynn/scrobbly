import React from 'react'
import { useColorScheme, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import myColors from '../../constants/myColors'
import spacing from '../../constants/spacing'
import CustomText from './CustomText'

const Counter = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <View
      style={{
        paddingRight: spacing.lg,
        ...props.style,
      }}
    >
      <CustomText
        children={props.title}
        size="H6"
        color={isDarkTheme ? myColors.cool_gray_400 : myColors.cool_gray_700}
        complementaryStyle={{ marginBottom: 4 }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons
          name={props.icon}
          size={20}
          color={isDarkTheme ? 'white' : myColors.cool_gray_900}
        />
        <CustomText
          children={props.value}
          bold
          size="H5"
          color={isDarkTheme ? 'white' : myColors.cool_gray_900}
          complementaryStyle={{ marginLeft: spacing.xs }}
        />
      </View>
    </View>
  )
}

export default Counter
