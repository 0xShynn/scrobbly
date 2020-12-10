import React from 'react'
import { View } from 'react-native'

const CenteredContainer = (props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}
    >
      {props.children}
    </View>
  )
}

export default CenteredContainer
