import React from 'react'
import { StyleSheet, View } from 'react-native'
import myColors from '../../constants/myColors'

const RoundedContainer = (props) => {
  return (
    <View style={{ ...styles.roundedContainer, ...props.style }}>
      {props.children}
    </View>
  )
}

export default RoundedContainer

const styles = StyleSheet.create({
  roundedContainer: {
    backgroundColor: myColors.medium_gray,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
})
