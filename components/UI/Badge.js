import React from 'react'
import { Text, View } from 'react-native'
import myColors from '../../constants/myColors'

const Badge = (props) => {
  return (
    <View style={{ ...props.style }}>
      <Text style={{ color: myColors.cool_gray_500, fontSize: 12 }}>
        {props.children}
      </Text>
    </View>
  )
}

export default Badge
