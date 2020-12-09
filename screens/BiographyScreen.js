import React from 'react'
import { View, ScrollView } from 'react-native'
import CustomText from '../components/UI/CustomText'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'

const BiographyScreen = (props) => {
  const { biography } = props.route.params
  return (
    <ScrollView
      style={{
        backgroundColor: myColors.dark_gray,
        flex: 1,
      }}
    >
      <View style={{ padding: spacing.xl }}>
        <CustomText children={biography} size="H6" />
      </View>
    </ScrollView>
  )
}

export default BiographyScreen
