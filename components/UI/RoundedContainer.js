import React from 'react'
import { StyleSheet, View } from 'react-native'
import myColors from '../../constants/myColors'
import spacing from '../../constants/spacing'

const RoundedContainer = (props) => {
  return (
    <View style={{ ...styles.roundedContainer, ...props.style }}>
      {props.children}
    </View>
  )
}

export default RoundedContainer

const styles = StyleSheet.create({
  roundedContainer: {
    backgroundColor: myColors.medium_gray,
    borderRadius: spacing.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
})
