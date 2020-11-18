import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import myColors from '../../constants/myColors'

const Badge = (props) => {
  return (
    <View style={{ ...styles.badge, ...props.style }}>
      <Text style={styles.badgeText}>{props.children}</Text>
    </View>
  )
}

export default Badge

const styles = StyleSheet.create({
  badge: {},
  badgeText: {
    color: myColors.cool_gray_500,
    fontSize: 12,
  },
})
