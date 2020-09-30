import React from 'react'
import { View, Text } from 'react-native'

const DetailsScreen = (props) => {
  console.log(props)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  )
}

export default DetailsScreen
