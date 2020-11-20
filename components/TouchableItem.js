import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import RoundedContainer from './UI/RoundedContainer'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'

const TouchableItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <RoundedContainer
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          ...props.style,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {props.children}
        </View>
        <View style={{ paddingLeft: spacing.sm }}>
          <Ionicons
            name="ios-arrow-forward"
            size={20}
            color={myColors.cool_gray_500}
          />
        </View>
      </RoundedContainer>
    </TouchableOpacity>
  )
}

export default TouchableItem
