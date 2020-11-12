import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TextH6, TitleH3 } from './Typography'
import myColors from '../../constants/myColors'

const Counter = (props) => {
  return (
    <View style={{ flexGrow: 1 }}>
      <TextH6
        style={{
          color: myColors.cool_gray_400,
          marginBottom: 8,
        }}
        children={props.title}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name={props.icon} size={24} color="white" />
        <TitleH3 style={{ marginLeft: 8, color: 'white' }}>
          {props.value}
        </TitleH3>
      </View>
    </View>
  )
}

export default Counter
