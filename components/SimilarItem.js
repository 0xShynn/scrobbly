import React from 'react'
import { View, Image } from 'react-native'
import TouchableItem from './TouchableItem'
import CustomText from './UI/CustomText'
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
        <CustomText
          children={props.title}
          size="H6"
          bold
          complementaryStyle={{ marginBottom: 2 }}
          numberOfLines={2}
        />

        {props.subtitle ? (
          <CustomText
            children={props.subtitle}
            size="H6"
            color={myColors.cool_gray_300}
          />
        ) : null}
      </View>
      {props.playcount ? (
        <View style={{ marginLeft: 10 }}>
          <CustomText size="H7" color={myColors.cool_gray_500}>
            {abbreviateNumber(props.playcount)}
          </CustomText>
        </View>
      ) : null}
    </TouchableItem>
  )
}

export default SimilarItem
