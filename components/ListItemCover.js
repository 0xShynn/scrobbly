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
import myColors from '../constants/myColors'

const ListItemCover = (props) => {
  return (
    <TouchableWithoutFeedback style={styles.itemCover} onPress={props.onSelect}>
      <ImageBackground
        source={{ uri: props.albumArt }}
        style={styles.listImageBackground}
      >
        <TouchableWithoutFeedback onPress={props.onSelect}>
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
                style={{ marginLeft: 8, color: 'white' }}
                children={props.playcount}
              />
            </View>
            <TitleH5
              style={{ color: 'white' }}
              numberOfLines={1}
              children={props.albumName}
            />
            <TextH6
              style={{ color: myColors.blue_gray_200 }}
              numberOfLines={1}
              children={props.artistName}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

export default ListItemCover

const styles = StyleSheet.create({
  itemCover: {
    width: '100%',
    height: '100%',
  },
  listImageBackground: {
    width: '100%',
    height: 190,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  listItem: {
    flex: 1,
    padding: 15,
    width: '100%',
    position: 'absolute',
    left: 0,
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
