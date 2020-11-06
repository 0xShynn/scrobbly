import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
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
      <View
        style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}
      >
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
              color: 'white',
            }}
          >
            {props.playCount}
          </TitleH5>
        ) : null}

        <Image
          source={{ uri: props.image }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 6,
            marginHorizontal: 10,
            overflow: 'hidden',
          }}
        />
        <View style={{ flex: 1, paddingRight: 20, zIndex: 2 }}>
          <TitleH5
            numberOfLines={1}
            style={{ color: 'white' }}
            children={props.title}
          />
          <TextH6
            numberOfLines={1}
            style={{ marginTop: 2, color: myColors.cool_gray_200 }}
            children={props.subtitle}
          />
        </View>
        {props.nowPlaying ? (
          <View>
            <Ionicons
              name="ios-musical-notes"
              size={20}
              color="white"
              style={{ marginRight: 20 }}
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
