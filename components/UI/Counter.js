import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TextH6, TitleH5 } from './Typography'
import myColors from '../../constants/myColors'
import spacing from '../../constants/spacing'

const Counter = (props) => {
  return (
    <View
      style={{
        paddingRight: spacing.lg,
        ...props.style,
      }}
    >
      <TextH6
        style={{
          color: myColors.cool_gray_400,
          marginBottom: 4,
        }}
        children={props.title}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name={props.icon} size={20} color="white" />
        <TitleH5 style={{ marginLeft: spacing.xs, color: 'white' }}>
          {props.value}
        </TitleH5>
      </View>
    </View>
  )
}

export default Counter
