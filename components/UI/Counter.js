import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TextH6, TitleH3 } from './Typography'
import myColors from '../../constants/myColors'
import spacing from '../../constants/spacing'

const Counter = (props) => {
  return (
    <View
      style={{
        paddingHorizontal: spacing.md,
        paddingVertical: 5,
        ...props.style,
      }}
    >
      <TextH6
        style={{
          color: myColors.cool_gray_400,
          marginBottom: spacing.xs,
          textAlign: 'center',
        }}
        children={props.title}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={props.icon} size={24} color="white" />
        <TitleH3 style={{ marginLeft: spacing.xs, color: 'white' }}>
          {props.value}
        </TitleH3>
      </View>
    </View>
  )
}

export default Counter
