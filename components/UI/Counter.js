import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { abbreviateNumber } from '../../utils/numbers'

const Counter = (props) => {
  return (
    <View style={styles.counter}>
      <Text style={styles.titleInfo}>{props.title}</Text>
      <Text style={styles.valueInfo}>{props.value}</Text>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  counter: {
    padding: 20,
  },
  titleInfo: {
    textTransform: 'uppercase',
    color: '#555',
  },
  valueInfo: {
    fontWeight: 'bold',
    fontSize: 24,
  },
})
