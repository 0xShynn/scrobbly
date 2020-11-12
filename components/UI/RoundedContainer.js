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
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
})
