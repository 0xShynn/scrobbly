import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import myColors from '../constants/myColors'
import { TitleH3, TextH5 } from './UI/Typography'

const DetailsHeader = (props) => {
  return (
    <View style={styles.header}>
      <View>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.albumInfo}>
        <TitleH3
          style={{ color: 'white', textAlign: 'center' }}
          numberOfLines={2}
          children={props.title}
        />
        <TextH5
          style={{ marginTop: 4, color: 'white', textAlign: 'center' }}
          numberOfLines={2}
          children={props.subtitle}
        />
      </View>
    </View>
  )
}

export default DetailsHeader

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: myColors.dark_gray,
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  albumInfo: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 20,
  },
})
