import React from 'react'
import { StyleSheet, View } from 'react-native'

const RoundedContainer = (props) => {
  return <View style={styles.roundedContainer}>{props.children}</View>
}

export default RoundedContainer

const styles = StyleSheet.create({
  roundedContainer: {
    backgroundColor: '#EEE',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
})
