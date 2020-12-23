import React from 'react'
import { TouchableOpacity } from 'react-native'
import myColors from '../../constants/myColors'
import useColorScheme from '../../hooks/useColorSchemeFix'
import CustomText from './CustomText'

export default function CustomButton({ label, onPress, themeColor }) {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  const buttonBgColorHandler = (value) => {
    switch (value) {
      case 'primary':
        return myColors.primary

      default:
        return myColors.gray_700
    }
  }

  const buttonTextColorHandler = (value) => {
    switch (value) {
      case 'primary':
        return 'white'

      default:
        return 'white'
    }
  }

  return (
    <TouchableOpacity
      style={{
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 160,
        backgroundColor: buttonBgColorHandler(themeColor),
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <CustomText
        children={label}
        size="H5"
        bold
        color={buttonTextColorHandler(themeColor)}
      />
    </TouchableOpacity>
  )
}
