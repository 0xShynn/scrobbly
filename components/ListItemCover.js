import React from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { TextH6, TitleH3, TitleH5 } from './UI/Typography'

const ListItemCover = (props) => {
  return (
    <ImageBackground
      source={{ uri: props.albumArt }}
      style={styles.listImageBackground}
    >
      <TouchableWithoutFeedback
        style={styles.itemCover}
        onPress={props.onSelect}
      >
        <View style={styles.listItem}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
            style={styles.itemGradientInfo}
          />
          <View style={styles.itemPlaycountContainer}>
            <Ionicons
              name="ios-musical-notes"
              size={20}
              color="white"
              style={styles.itemIcon}
            />
            <TitleH3
              style={{ marginLeft: 8 }}
              color="white"
              children={props.playcount}
            />
          </View>
          <TitleH5 color="white" numberOfLines={1} children={props.albumName} />
          <TextH6 color="#DDD" numberOfLines={1} children={props.artistName} />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default ListItemCover

const styles = StyleSheet.create({
  itemCover: {
    padding: 20,
    width: '100%',
    height: '100%',
  },
  listImageBackground: {
    height: 190,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  listItem: {
    flex: 1,
    width: 190,
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  itemGradientInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    flex: 1,
  },
  itemPlaycountContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemIcon: {
    alignSelf: 'center',
  },
})
