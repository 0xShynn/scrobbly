import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, Image, View } from 'react-native'
import { useSelector } from 'react-redux'

import DetailsHeader from '../components/DetailsHeader'
import ItemStats from '../components/ItemStats'
import LoadingContainer from '../components/UI/LoadingContainer'
import {
  DetailsTitle,
  TextH6,
  TitleH5,
  TitleH6,
} from '../components/UI/Typography'
import CustomButton from '../components/UI/CustomButton'

import { Ionicons } from '@expo/vector-icons'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import { getSpotifyAlbumInfo } from '../utils/spotify'
import { getAlbumInfo, getArtistInfo } from '../utils/lastfm'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TouchableItem from '../components/TouchableItem'
import { abbreviateNumber } from '../utils/numbers'

const itemSeparator = () => (
  <View style={{ height: 1, backgroundColor: '#1C1C1C' }} />
)

const AlbumDetailsScreen = ({ navigation, route }) => {
  const { artistName, albumName, albumArt, topPlaycount } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [albumTracklist, setAlbumTracklist] = useState([])
  const [data, setData] = useState({})
  const [albumInfo, setAlbumInfo] = useState()
  const [artistInfo, setArtistInfo] = useState()
  const username = useSelector((state) => state.auth.username)

  const itemTrackList = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
        }}
        onPress={itemSelectTrackHandler.bind(this, item.trackName)}
      >
        <TitleH6
          style={{ minWidth: 25, color: 'white' }}
          children={item.trackNumber}
        />
        <TextH6
          numberOfLines={1}
          style={{ flex: 1, color: 'white' }}
          children={item.trackName}
        />
        <TextH6 style={{ paddingLeft: 10 }} children={item.duration} />
      </TouchableOpacity>
    )
  }

  const itemSelectTrackHandler = (trackName) => {
    navigation.navigate('Scrobble Details', {
      artistName,
      trackName,
      albumArt,
      albumName,
    })
  }

  const itemSelectArtistHandler = () => {
    const artistImage = artistInfo.image
    const playcount = artistInfo.playcount
    const listeners = artistInfo.listeners
    navigation.navigate('Artist Details', {
      artistName,
      artistImage,
      playcount,
      listeners,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const spotifyData = await getSpotifyAlbumInfo(artistName, albumName)
      setData(spotifyData)

      const albumInfoData = await getAlbumInfo(username, artistName, albumName)
      setAlbumInfo(albumInfoData)

      const artistInfoData = await getArtistInfo(username, artistName)
      setArtistInfo(artistInfoData)

      if (spotifyData !== null) {
        setAlbumTracklist(spotifyData.tracklist)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const keyExtractor = useCallback((item) => item + item.id, [])

  const ListHeader = () => {
    return (
      <>
        <DetailsHeader
          title={albumName}
          subtitle={artistName}
          image={albumArt}
        />

        {data && !isLoading ? (
          <View>
            {albumInfo && !isLoading ? (
              <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                <ItemStats
                  playcount={albumInfo.playcount}
                  userplaycount={albumInfo.userplaycount}
                  listeners={albumInfo.listeners}
                  topPlaycount={topPlaycount}
                />
              </View>
            ) : null}

            {artistInfo && !isLoading ? (
              <View
                style={{
                  paddingHorizontal: spacing.md,
                  marginBottom: spacing.xl,
                }}
              >
                <TouchableItem onPress={itemSelectArtistHandler}>
                  <Image
                    source={{ uri: artistInfo.image }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 70,
                      marginRight: 15,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <TitleH5
                      style={{ marginBottom: 4 }}
                      children={artistName}
                    />
                    <TextH6
                      style={{ color: myColors.cool_gray_500 }}
                      numberOfLines={2}
                    >
                      {abbreviateNumber(artistInfo.playcount)} scrobbles
                    </TextH6>
                  </View>
                </TouchableItem>
              </View>
            ) : null}

            <DetailsTitle
              style={{
                paddingHorizontal: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: myColors.cool_gray_990,
                marginBottom: 0,
                paddingBottom: spacing.md,
              }}
            >
              Tracklist
            </DetailsTitle>
          </View>
        ) : null}
      </>
    )
  }

  const ListFooter = () => {
    return (
      <View
        style={{
          paddingTop: spacing.xs,
          paddingBottom: 40,
          paddingHorizontal: spacing.md,
        }}
      >
        {data && !isLoading ? (
          <TextH6 style={{ color: myColors.cool_gray_500 }}>
            {data.copyrights}
          </TextH6>
        ) : null}
      </View>
    )
  }

  const ListEmpty = () => {
    if (isLoading) {
      return (
        <View style={{ padding: 100 }}>
          <LoadingContainer />
        </View>
      )
    }

    return (
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextH6
          style={{ textAlign: 'center' }}
          children="Tracklist not found"
        />
        <CustomButton
          label="Go Back"
          onPress={() => navigation.goBack()}
          style={{ marginVertical: spacing.md }}
        />
      </View>
    )
  }

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistName} - ${albumName}`,
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, backgroundColor: myColors.dark_gray }}>
      <FlatList
        data={albumTracklist}
        renderItem={itemTrackList}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        ListFooterComponent={ListFooter}
        initialNumToRender={12}
      />
    </View>
  )
}

export default AlbumDetailsScreen
