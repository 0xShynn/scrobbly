import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextH5 } from './Typography'

const ErrorBanner = (props) => {
  return (
    <View style={styles.banner}>
      <TextH5>{props.children}</TextH5>
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
