import React from 'react'
import { View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { abbreviateNumber } from '../utils/numbers'
import Badge from './UI/Badge'
import { TextH6, TitleH5, TitleH6 } from './UI/Typography'
import myColors from '../constants/myColors'

const SimilarTrack = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View
        style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
      >
        <Image
          source={{ uri: props.image }}
          style={{ width: 60, height: 60, borderRadius: 6, marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <TitleH6 style={{ marginBottom: 2 }} numberOfLines={1}>
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
      </View>
    </TouchableOpacity>
  )
}

export default SimilarTrack
