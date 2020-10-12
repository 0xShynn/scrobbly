import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TextH6, TitleH2 } from './Typography'
import myColors from '../../constants/myColors'

const Counter = (props) => {
  return (
    <View style={styles.counter}>
      <TextH6 style={styles.titleInfo} children={props.title} />
      <View style={styles.iconContainer}>
        <Ionicons name={props.icon} size={24} color={myColors.blue_gray_990} />
        <TitleH2 style={{ marginLeft: 8 }}>{props.value}</TitleH2>
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
    marginBottom: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
