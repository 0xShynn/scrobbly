import React from 'react'
import { StyleSheet, View } from 'react-native'

const CenteredContainer = (props) => {
  return <View style={styles.centered}>{props.children}</View>
}

export default CenteredContainer

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
