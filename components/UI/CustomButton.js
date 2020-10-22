import React from 'react'
import { TouchableOpacity } from 'react-native'
import myColors from '../../constants/myColors'
import { TitleH5 } from './Typography'

export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        padding: 16,
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: myColors.primary,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <TitleH5
        style={{ fontSize: 18, color: 'white', textTransform: 'uppercase' }}
      >
        {label}
      </TitleH5>
    </TouchableOpacity>
  )
}
