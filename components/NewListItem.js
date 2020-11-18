import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../utils/dayjs'
import Badge from './UI/Badge'
import { TextH6, TitleH3, TitleH4, TitleH5 } from './UI/Typography'
import myColors from '../constants/myColors'

const NewListItem = (props) => {
  const timestamp = dayjs(props.date).utc(true).fromNow()

  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.rank ? (
          <View>
            <TitleH3
              style={{
                textAlign: 'center',
                color: 'white',
                minWidth: 25,
                marginRight: 15,
              }}
            >
              {props.rank}
            </TitleH3>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: myColors.medium_gray,
            padding: 15,
            paddingRight: 20,
            borderRadius: 20,
            flex: 1,
          }}
        >
          <Image
            source={{ uri: props.image }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 6,
              marginRight: 15,
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
              style={{ marginTop: 2, color: 'white' }}
              children={props.subtitle}
            />
            {props.playcount ? (
              <TextH6 style={{ marginTop: 2, color: myColors.cool_gray_400 }}>
                {props.playcount} scrobbles
              </TextH6>
            ) : null}
          </View>
          {props.nowPlaying ? (
            <View>
              <Ionicons name="ios-musical-notes" size={20} color="white" />
            </View>
          ) : props.date ? (
            <Badge>{timestamp}</Badge>
          ) : null}
          <View style={{ paddingLeft: 15 }}>
            <Ionicons
              name="ios-arrow-forward"
              size={20}
              color={myColors.cool_gray_700}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NewListItem
