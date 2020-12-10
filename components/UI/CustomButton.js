import React from 'react'
import { TouchableOpacity, useColorScheme } from 'react-native'
import myColors from '../../constants/myColors'
import CustomText from './CustomText'

export default function CustomButton({ label, onPress, style, color }) {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <TouchableOpacity
      style={{
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 160,
        backgroundColor: color
          ? color
          : isDarkTheme
          ? myColors.cool_gray_700
          : myColors.cool_gray_300,
        ...style,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <CustomText
        children={label}
        size="H5"
        color={isDarkTheme ? 'white' : myColors.cool_gray_900}
      />
    </TouchableOpacity>
  )
}
