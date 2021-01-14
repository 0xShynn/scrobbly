import React from 'react'
import { View } from 'react-native'
import CustomText from './UI/CustomText'
import { MaterialIcons } from '@expo/vector-icons'
import myColors from '../constants/myColors'
import useColorScheme from '../hooks/useColorSchemeFix'
import spacing from '../constants/spacing'

const DetailsTitle = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
        ...props.complementaryStyle,
      }}
    >
      <MaterialIcons name="arrow-right" size={30} color={myColors.gray_500} />
      <CustomText
        size="H3"
        bold
        color={isDarkTheme ? 'white' : myColors.gray_900}
      >
        {props.children}
      </CustomText>
    </View>
  )
}

export default DetailsTitle
