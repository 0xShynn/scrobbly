import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import RoundedContainer from './UI/RoundedContainer'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import useColorScheme from '../hooks/useColorSchemeFix'

const TouchableItem = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

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
            color={isDarkTheme ? myColors.gray_500 : myColors.gray_400}
          />
        </View>
      </RoundedContainer>
    </TouchableOpacity>
  )
}

export default TouchableItem
