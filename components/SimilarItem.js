import React from 'react'
import { View, Image } from 'react-native'
import TouchableItem from './TouchableItem'
import Badge from './UI/Badge'
import { TextH6, TitleH6 } from './UI/Typography'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import { abbreviateNumber } from '../utils/numbers'

const SimilarItem = (props) => {
  return (
    <TouchableItem onPress={props.onPress} style={{ marginBottom: 10 }}>
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
        {props.subtitle ? (
          <TextH6 style={{ color: myColors.cool_gray_400 }}>
            {props.subtitle}
          </TextH6>
        ) : null}
      </View>
      {props.playcount ? (
        <View style={{ marginLeft: 10 }}>
          <Badge>{abbreviateNumber(props.playcount)}</Badge>
        </View>
      ) : null}
    </TouchableItem>
  )
}

export default SimilarItem
