import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ErrorBanner = (props) => {
  return (
    <View style={styles.banner}>
      <Text>{props.children}</Text>
    </View>
  )
}

export default ErrorBanner

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'orange',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
