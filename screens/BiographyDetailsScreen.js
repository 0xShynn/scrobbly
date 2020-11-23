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
import { getSimilarArtists, getTopAlbums, getTopTracks } from '../utils/lastfm'
import { abbreviateNumber } from '../utils/numbers'
import { LinearGradient } from 'expo-linear-gradient'
import SimilarTrack from '../components/SimilarTrack'

const listItemSeparator = () => <View style={{ width: 20 }} />

const BiographyDetailsScreen = ({ navigation, route }) => {
  const { artistInfo, artistName } = route.params
  const [similarArtists, setSimilarArtists] = useState()
  const [artistTopTracks, setArtistTopTracks] = useState()
  const [artistTopAlbums, setArtistTopAlbums] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const similarArtistsData = await getSimilarArtists(artistName)
        setSimilarArtists(similarArtistsData)

        const artistTopTracksData = await getTopTracks('artist', artistName)
        setArtistTopTracks(artistTopTracksData)

        const artistTopAlbumsData = await getTopAlbums('artist', artistName)
        setArtistTopAlbums(artistTopAlbumsData)
      } catch (error) {}
    }
    fetchData()
  }, [])

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

  const itemTopTracksHandler = async (
    artistName,
    trackName,
    albumArt,
    albumName
  ) => {
    navigation.push('Scrobble Details', {
      artistName,
      trackName,
      albumArt,
      albumName,
    })
  }

  const itemTopAlbumsHandler = async (artistName, albumName, albumArt) => {
    navigation.push('Album Details', {
      artistName,
      albumName,
      albumArt,
    })
  }

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

          {artistTopTracks && artistTopTracks.length !== 0 ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                padding: 20,
              }}
            >
              <DetailsTitle children="Top Tracks" />
              {artistTopTracks.map((item) => (
                <SimilarTrack
                  title={item.trackName}
                  subtitle={item.artistName}
                  image={item.albumArt}
                  playcount={item.playcount}
                  key={item.id}
                  onPress={itemTopTracksHandler.bind(
                    this,
                    item.artistName,
                    item.trackName,
                    item.albumArt,
                    item.albumName
                  )}
                />
              ))}
            </View>
          ) : null}

          {artistTopAlbums && artistTopAlbums.length !== 0 ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                padding: 20,
              }}
            >
              <DetailsTitle children="Top Albums" />
              {artistTopAlbums.map((item) => {
                return (
                  <SimilarTrack
                    title={item.albumName}
                    subtitle={item.artistName}
                    image={item.albumArt}
                    playcount={item.playcount}
                    key={item.id}
                    onPress={itemTopAlbumsHandler.bind(
                      this,
                      item.artistName,
                      item.albumName,
                      item.albumArt
                    )}
                  />
                )
              })}
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
