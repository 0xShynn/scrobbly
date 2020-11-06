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
  badge: {
    backgroundColor: myColors.cool_gray_990,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  badgeText: {
    color: myColors.cool_gray_100,
    fontSize: 12,
  },
})
