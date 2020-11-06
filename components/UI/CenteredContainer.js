import React from 'react'
import { StyleSheet, View } from 'react-native'
import myColors from '../../constants/myColors'

const CenteredContainer = (props) => {
  return (
    <View style={{ ...styles.centered, ...props.style }}>{props.children}</View>
  )
}

export default CenteredContainer

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myColors.dark_gray,
  },
})
