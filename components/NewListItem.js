import React from 'react'
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../utils/dayjs'
import TouchableItem from './TouchableItem'
import Badge from './UI/Badge'
import { TextH6, TitleH3, TitleH6 } from './UI/Typography'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'

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
      <View>
        <View
          style={{
            position: 'relative',
            width: 60,
            height: 60,
            marginRight: spacing.sm,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {props.isLoading && !props.isRefreshing ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0, 0.5)',
                zIndex: 1,
              }}
            />
          ) : null}

          <Image
            source={{ uri: props.image }}
            style={{
              width: 60,
              height: 60,
              position: 'absolute',
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1, paddingRight: spacing.md }}>
        <TitleH6
          numberOfLines={2}
          style={{ color: 'white' }}
          children={props.title}
        />
        <TextH6
          numberOfLines={1}
          style={{
            marginTop: 2,
            color: myColors.cool_gray_300,
          }}
          children={props.subtitle}
        />

        {props.playcount ? (
          <Badge style={{ marginTop: 2 }}>{props.playcount} scrobbles</Badge>
        ) : null}
      </View>
      {props.date ? <Badge>{timestamp}</Badge> : null}
      {/* {props.nowPlaying ? <Badge>Now Playing</Badge> : null} */}
      {props.nowPlaying ? (
        <Ionicons name="ios-musical-notes" size={20} color="white" />
      ) : null}
    </TouchableItem>
  )
}

export default NewListItem
