import React from 'react'
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../utils/dayjs'
import TouchableItem from './TouchableItem'
import CustomText from './UI/CustomText'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'

const ListItem = (props) => {
  const timestamp = dayjs(props.date).utc(true).fromNow()

  return (
    <TouchableItem onPress={props.onPress}>
      {props.rank ? (
        <View>
          <CustomText
            size="H3"
            color="white"
            bold
            complementaryStyle={{
              textAlign: 'center',
              minWidth: 26,
              marginRight: 10,
            }}
          >
            {props.rank}
          </CustomText>
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
        <CustomText
          children={props.title}
          size="H6"
          bold
          numberOfLines={2}
          complementaryStyle={{ marginBottom: 2 }}
        />
        <CustomText
          children={props.subtitle}
          size="H6"
          color={myColors.cool_gray_300}
        />

        {props.playcount ? (
          <CustomText
            size="H7"
            color={myColors.cool_gray_400}
            complementaryStyle={{ marginTop: 3 }}
          >
            {props.playcount} scrobbles
          </CustomText>
        ) : null}
      </View>
      {props.date ? (
        <CustomText size="H7" color={myColors.cool_gray_500}>
          {timestamp}
        </CustomText>
      ) : null}
      {/* {props.nowPlaying ? <CustomText size="H7">Now Playing</CustomText> : null} */}
      {props.nowPlaying ? (
        <Ionicons name="ios-musical-notes" size={20} color="white" />
      ) : null}
    </TouchableItem>
  )
}

export default ListItem
