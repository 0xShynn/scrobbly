import React from 'react'
import { View } from 'react-native'
import myColors from '../../constants/myColors'

const CenteredContainer = (props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: myColors.dark_gray,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  )
}

export default CenteredContainer
