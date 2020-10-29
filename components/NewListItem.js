import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../utils/dayjs'
import Badge from './UI/Badge'
import { TextH6, TitleH5 } from './UI/Typography'
import myColors from '../constants/myColors'

const NewListItem = (props) => {
  const date = props.date
  const timestamp = dayjs(date).utc(true).fromNow()

  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.itemContainer}>
        {props.isLoading && !props.isRefreshing ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(255,255,255, 0.3)',
              zIndex: 1,
            }}
          />
        ) : null}
        {props.playCount ? (
          <TitleH5
            style={{
              marginLeft: 8,
              minWidth: 36,
              textAlign: 'center',
            }}
          >
            {props.playCount}
          </TitleH5>
        ) : null}

        <Image source={{ uri: props.image }} style={styles.albumArt} />
        <View style={styles.infoContainer}>
          <TitleH5 numberOfLines={1} children={props.title} />
          <TextH6
            numberOfLines={1}
            style={{ marginTop: 2, color: myColors.blue_gray_700 }}
            children={props.subtitle}
          />
        </View>
        {props.nowPlaying ? (
          <View>
            <Ionicons
              name="ios-musical-notes"
              size={20}
              color={myColors.blue_gray_990}
              style={styles.nowPlaying}
            />
          </View>
        ) : props.date ? (
          <Badge>{timestamp}</Badge>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default NewListItem

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: 'white',
  },
  albumArt: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 20,
    zIndex: 2,
  },
  nowPlaying: {
    marginRight: 20,
  },
})
