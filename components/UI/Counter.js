import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Counter = (props) => {
  return (
    <View style={styles.counter}>
      <Text style={styles.titleInfo}>{props.title}</Text>
      <View style={styles.lol}>
        <Ionicons
          name={props.icon}
          size={22}
          color="#444"
          iconStyle={{ marginRight: 10 }}
        />
        <Text style={styles.valueInfo}>{props.value}</Text>
      </View>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  counter: {
    padding: 20,
    flex: 1,
  },
  titleInfo: {
    textTransform: 'uppercase',
    color: '#555',
    marginBottom: 4,
  },
  lol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueInfo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 6,
  },
})
