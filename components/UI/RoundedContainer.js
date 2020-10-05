import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RoundedContainer = (props) => {
  return <View style={styles.roundedContainer}>{props.children}</View>
}

export default RoundedContainer

const styles = StyleSheet.create({
  roundedContainer: {
    backgroundColor: '#DDD',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
})
