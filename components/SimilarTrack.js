import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { abbreviateNumber } from '../utils/numbers'
import Badge from './UI/Badge'
import { TextH6, TitleH6 } from './UI/Typography'
import myColors from '../constants/myColors'
import { Ionicons } from '@expo/vector-icons'
import spacing from '../constants/spacing'

const SimilarTrack = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: myColors.medium_gray,
          padding: spacing.sm,
          paddingRight: spacing.md,
          borderRadius: spacing.sm,
        }}
      >
        <Image
          source={{ uri: props.image }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 4,
            marginRight: spacing.md,
          }}
        />
        <View style={{ flex: 1 }}>
          <TitleH6 style={{ marginBottom: 2 }} numberOfLines={2}>
            {props.title}
          </TitleH6>
          <TextH6 style={{ color: myColors.cool_gray_400 }}>
            {props.subtitle}
          </TextH6>
        </View>
        {props.playcount ? (
          <View style={{ marginLeft: 10 }}>
            <Badge>{abbreviateNumber(props.playcount)}</Badge>
          </View>
        ) : null}
        <View style={{ paddingLeft: spacing.md }}>
          <Ionicons
            name="ios-arrow-forward"
            size={20}
            color={myColors.cool_gray_500}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SimilarTrack
