import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextH4, TitleH4 } from './UI/Typography'

const CustomHeaderTitle = (props) => {
  return (
    <View style={styles.headerTitle}>
      <TitleH4 style={{ color: 'white', marginRight: 6 }}>
        {props.title}
      </TitleH4>
      {props.periodSelected && (
        <TextH4 style={{ color: 'white' }}>/ {props.periodSelected}</TextH4>
      )}
    </View>
  )
}

export default CustomHeaderTitle

const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
