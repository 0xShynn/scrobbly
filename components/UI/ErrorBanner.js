import React from 'react'
import { View } from 'react-native'
import { TextH5 } from './Typography'

const ErrorBanner = (props) => {
  return (
    <View
      style={{
        backgroundColor: 'orange',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextH5>{props.children}</TextH5>
    </View>
  )
}

export default ErrorBanner
