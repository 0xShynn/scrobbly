import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  View,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native'
import RoundedContainer from '../components/UI/RoundedContainer'
import {
  DetailsTitle,
  TextH6,
  TitleH2,
  TitleH5,
} from '../components/UI/Typography'
import myColors from '../constants/myColors'
import { getSimilarArtists } from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'
import { LinearGradient } from 'expo-linear-gradient'

const listItemSeparator = () => <View style={{ width: 20 }} />

const BiographyDetailsScreen = ({ route }) => {
  const { artistInfo, artistName } = route.params
  const [similarArtists, setSimilarArtists] = useState()

  const listItem = ({ item, index }) => {
    return (
      <View
        style={{
          paddingLeft: index === 0 ? 20 : 0,
          paddingRight: index === similarArtists.length - 1 ? 20 : 0,
        }}
      >
        <ImageBackground
          source={{ uri: item.artistImage300 }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.8)',
            ]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
              flex: 1,
            }}
          />
          <TitleH5
            style={{ padding: 10, position: 'absolute', bottom: 0 }}
            numberOfLines={1}
          >
            {item.artistName}
          </TitleH5>
        </ImageBackground>
      </View>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const similarArtistsData = await getSimilarArtists(artistName)
        setSimilarArtists(similarArtistsData)
      } catch (error) {}
    }
    fetchData()
  }, [])

  return (
    <ScrollView style={{ backgroundColor: myColors.dark_gray }}>
      <View
        style={{
          backgroundColor: myColors.dark_gray,
          flex: 1,
          paddingHorizontal: 0,
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

          {artistInfo.bio ? (
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <DetailsTitle children="Biography" />
              <RoundedContainer style={{ flex: 1 }}>
                <TextH6 style={{ lineHeight: 18 }} numberOfLines={6}>
                  {artistInfo.bio}
                </TextH6>
              </RoundedContainer>
            </View>
          ) : null}

          {similarArtists && similarArtists.length !== 0 ? (
            <View style={{ flex: 1 }}>
              <DetailsTitle
                children="Similar Artists"
                style={{ marginLeft: 20 }}
              />
              <FlatList
                data={similarArtists}
                renderItem={listItem}
                horizontal={true}
                ItemSeparatorComponent={listItemSeparator}
              />
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  )
}

export default BiographyDetailsScreen
