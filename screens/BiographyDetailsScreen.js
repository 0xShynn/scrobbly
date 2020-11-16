import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { TextH6, TitleH2 } from '../components/UI/Typography'
import myColors from '../constants/myColors'
import { abbreviateNumber } from '../utils/numbers'

const BiographyDetailsScreen = ({ route }) => {
  const { artistInfo, artistName } = route.params
  return (
    <ScrollView style={{ backgroundColor: myColors.dark_gray }}>
      <View
        style={{
          backgroundColor: myColors.dark_gray,
          flex: 1,
          paddingHorizontal: 30,
          paddingVertical: 50,
        }}
      >
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image
            source={{ uri: artistInfo.image }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <TitleH2 style={{ marginBottom: 5 }}>{artistName}</TitleH2>
          <TextH6
            style={{
              color: myColors.cool_gray_400,
              marginBottom: 30,
            }}
          >
            Scrobbles {abbreviateNumber(artistInfo.playcount)} | Listeners{' '}
            {abbreviateNumber(artistInfo.listeners)}
          </TextH6>
          <TextH6 style={{ lineHeight: 18 }}>{artistInfo.bio}</TextH6>
        </View>
      </View>
    </ScrollView>
  )
}

export default BiographyDetailsScreen
