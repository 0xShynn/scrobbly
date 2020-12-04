import React from 'react'
import { TouchableOpacity } from 'react-native'
import myColors from '../../constants/myColors'
import { TitleH5 } from './Typography'

export default function CustomButton({ label, onPress, style, color }) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 160,
        backgroundColor: color ? color : myColors.cool_gray_700,
        ...style,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <TitleH5 style={{ fontSize: 16, color: 'white' }}>{label}</TitleH5>
    </TouchableOpacity>
  )
}
