import React from 'react'
import { Text } from 'react-native'

const CustomText = (props) => {
  const fontSizeHandler = (size) => {
    switch (size) {
      case 'H7':
        return 12
      case 'H6':
        return 14
      case 'H5':
        return 16
      case 'H4':
        return 18
      case 'H3':
        return 20
      case 'H2':
        return 28
      case 'H1':
        return 30
      default:
        return 14
    }
  }

  return (
    <Text
      style={{
        fontSize: fontSizeHandler(props.size),
        fontFamily: props.bold ? 'Inter_700Bold' : 'Inter_400Regular',
        color: props.color ? props.color : 'white',
        ...props.complementaryStyle,
      }}
      {...props}
    >
      {props.children}
    </Text>
  )
}

export default CustomText
