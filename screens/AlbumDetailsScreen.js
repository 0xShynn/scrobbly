import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import DetailsHeader from '../components/DetailsHeader'
import ItemStats from '../components/ItemStats'
import LoadingContainer from '../components/UI/LoadingContainer'
import { TextH6, TitleH6 } from '../components/UI/Typography'
import CustomButton from '../components/UI/CustomButton'

import { Ionicons } from '@expo/vector-icons'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import { getSpotifyAlbumInfo } from '../utils/spotify'
import { getAlbumInfo } from '../utils/lastfm'

const itemList = ({ item }) => {
  return (
    <View style={styles.trackItem}>
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
    </View>
  )
}

const itemSeparator = () => <View style={styles.itemSeparator} />

const AlbumDetailsScreen = ({ navigation, route }) => {
  const { artistName, albumName, albumArt, topPlaycount } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [albumTracklist, setAlbumTracklist] = useState([])
  const [data, setData] = useState({})
  const [albumInfo, setAlbumInfo] = useState()
  const username = useSelector((state) => state.auth.username)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const spotifyData = await getSpotifyAlbumInfo(artistName, albumName)
      setData(spotifyData)

      const albumInfoData = await getAlbumInfo(username, artistName, albumName)
      setAlbumInfo(albumInfoData)

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

            <View
              style={{
                alignItems: 'center',
                paddingBottom: 20,
              }}
            >
              <TextH6 style={{ color: myColors.cool_gray_500 }}>
                {data.release_year}
                {' • '}
                {data.total_tracks} {data.track_word}
                {', '}
                {data.total_length_text}
              </TextH6>
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: myColors.cool_gray_990,
                paddingVertical: 10,
              }}
            >
              <TextH6 style={{ marginLeft: 30, color: myColors.cool_gray_600 }}>
                #
              </TextH6>
              <TextH6
                style={{
                  marginLeft: 15,
                  flex: 1,
                  color: myColors.cool_gray_600,
                }}
              >
                TITLE
              </TextH6>
              <Ionicons
                name="md-time"
                size={18}
                color={myColors.cool_gray_700}
                style={{ justifyContent: 'flex-end', marginRight: 37 }}
              />
            </View>
          </View>
        ) : null}
      </>
    )
  }

  const ListFooter = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 40,
          paddingHorizontal: 30,
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
      <View style={{ ...styles.listContainer, ...styles.listEmpty }}>
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
    <View style={styles.container}>
      <FlatList
        data={albumTracklist}
        renderItem={itemList}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        ListFooterComponent={ListFooter}
        initialNumToRender={12}
        style={styles.listContainer}
      />
    </View>
  )
}

export default AlbumDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.dark_gray,
  },
  listContainer: {
    height: Dimensions.get('window').height,
  },
  listEmpty: {
    height: Dimensions.get('window').height / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tracklistHeader: {
    color: myColors.cool_gray_500,
  },
  trackItem: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#1C1C1C',
  },
})
