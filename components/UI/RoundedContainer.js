import React from 'react'
import { View } from 'react-native'
import myColors from '../../constants/myColors'
import spacing from '../../constants/spacing'

const RoundedContainer = (props) => {
  return (
    <View
      style={{
        backgroundColor: myColors.medium_gray,
        borderRadius: spacing.md,
        padding: spacing.sm,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  )
}

export default RoundedContainer
