import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { TextH6 } from '../components/UI/Typography'
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
        <TextH6 style={{ color: 'white' }}>{biography}</TextH6>
      </View>
    </ScrollView>
  )
}

export default BiographyScreen
