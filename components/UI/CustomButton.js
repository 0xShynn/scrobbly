import React from 'react'
import { TouchableOpacity } from 'react-native'
import myColors from '../../constants/myColors'
import useColorScheme from '../../hooks/useColorSchemeFix'
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
          ? myColors.gray_700
          : myColors.gray_300,
        ...style,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <CustomText
        children={label}
        size="H5"
        color={isDarkTheme ? 'white' : myColors.gray_900}
      />
    </TouchableOpacity>
  )
}
