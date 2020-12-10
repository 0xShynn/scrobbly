import React from 'react'
import { useColorScheme, View } from 'react-native'
import myColors from '../../constants/myColors'
import spacing from '../../constants/spacing'

const RoundedContainer = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <View
      style={{
        backgroundColor: isDarkTheme ? myColors.medium_gray : 'white',
        borderRadius: spacing.md,
        padding: spacing.sm,
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.05,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  )
}

export default RoundedContainer
