import React from 'react'
import { View, ScrollView } from 'react-native'
import CustomText from '../components/UI/CustomText'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import useColorScheme from '../hooks/useColorSchemeFix'

const BiographyScreen = (props) => {
  const { biography } = props.route.params
  const isDarkTheme = useColorScheme() === 'dark' ? true : false
  return (
    <ScrollView
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
        flex: 1,
      }}
    >
      <View style={{ padding: spacing.xl }}>
        <CustomText
          children={biography}
          size="H6"
          color={isDarkTheme ? 'white' : myColors.gray_900}
        />
      </View>
    </ScrollView>
  )
}

export default BiographyScreen
