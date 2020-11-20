import React from 'react'
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../utils/dayjs'
import Badge from './UI/Badge'
import { TextH6, TitleH3, TitleH6 } from './UI/Typography'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import TouchableItem from './TouchableItem'

const NewListItem = (props) => {
  const timestamp = dayjs(props.date).utc(true).fromNow()

  return (
    <TouchableItem onPress={props.onPress}>
      {props.rank ? (
        <View>
          <TitleH3
            style={{
              textAlign: 'center',
              color: 'white',
              minWidth: 26,
              marginRight: 10,
            }}
          >
            {props.rank}
          </TitleH3>
        </View>
      ) : null}
      <Image
        source={{ uri: props.image }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 4,
          marginRight: spacing.sm,
          overflow: 'hidden',
        }}
      />
      <View style={{ flex: 1, paddingRight: spacing.md }}>
        <TitleH6
          numberOfLines={1}
          style={{ color: 'white' }}
          children={props.title}
        />
        <TextH6
          numberOfLines={1}
          style={{ marginTop: 2, marginBottom: 4, color: 'white' }}
          children={props.subtitle}
        />
        {props.date ? <Badge>{timestamp}</Badge> : null}
        {props.nowPlaying ? <Badge>Now Playing</Badge> : null}
        {props.playcount ? (
          <TextH6 style={{ marginTop: 2, color: myColors.cool_gray_400 }}>
            {props.playcount} scrobbles
          </TextH6>
        ) : null}
      </View>
      {props.nowPlaying ? (
        <View style={{ paddingRight: spacing.xs }}>
          <Ionicons name="ios-musical-notes" size={20} color="white" />
        </View>
      ) : null}
    </TouchableItem>
  )
}

export default NewListItem
