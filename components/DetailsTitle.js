import React from 'react'
import { View } from 'react-native'
import CustomText from './UI/CustomText'
import { Ionicons } from '@expo/vector-icons'
import myColors from '../constants/myColors'
import useColorScheme from '../hooks/useColorSchemeFix'

const DetailsTitle = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        ...props.complementaryStyle,
      }}
    >
      <Ionicons name="md-arrow-dropright" size={24} color={myColors.gray_600} />
      <CustomText
        size="H3"
        bold
        color={isDarkTheme ? 'white' : myColors.gray_900}
        complementaryStyle={{ marginLeft: 10 }}
      >
        {props.children}
      </CustomText>
    </View>
  )
}

export default DetailsTitle
