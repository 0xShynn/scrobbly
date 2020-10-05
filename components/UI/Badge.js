import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
    backgroundColor: '#EEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  badgeText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
})
