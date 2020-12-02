import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View, ScrollView, Image, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { DetailsTitle, TextH6, TitleH2 } from '../components/UI/Typography'
import LoadingContainer from '../components/UI/LoadingContainer'
import TouchableItem from '../components/TouchableItem'
import SimilarItem from '../components/SimilarItem'
import ListItemsArtist from '../components/ListItemsArtist'

import myColors from '../constants/myColors'
import {
  getArtistInfo,
  getSimilarArtists,
  getTopAlbums,
  getTopTracks,
} from '../utils/lastfm'
import ItemStats from '../components/ItemStats'
import spacing from '../constants/spacing'

const listItemSeparator = () => <View style={{ width: 20 }} />

const ArtistDetailsScreen = ({ navigation, route }) => {
  const { artistName, artistImage, topPlaycount } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [artistInfo, setArtistInfo] = useState()
  const [artistTopTracks, setArtistTopTracks] = useState()
  const [artistTopAlbums, setArtistTopAlbums] = useState()
  const [similarArtists, setSimilarArtists] = useState()
  const username = useSelector((state) => state.auth.username)

  // const artistInfoHandler = useCallback(async () => {
  //   const data = await getArtistInfo(username, artistName)
  //   setArtistInfo(data)
  // }, [artistName])

  // const artistTopTracksHandler = useCallback(async () => {
  //   const data = await getTopTracks('artist', artistName)
  //   setArtistTopTracks(data)
  // }, [artistName])

  // const artistTopAlbumsHandler = useCallback(async () => {
  //   const data = await getTopAlbums('artist', artistName)
  //   setArtistTopAlbums(data)
  // }, [artistName])

  // const similarArtistsHandler = useCallback(async () => {
  //   const data = await getSimilarArtists(artistName)
  //   setSimilarArtists(data)
  // }, [artistName])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const artistInfoData = await getArtistInfo(username, artistName)
        setArtistInfo(artistInfoData)

        const artistTopTracksData = await getTopTracks('artist', artistName)
        setArtistTopTracks(artistTopTracksData)

        const artistTopAlbumsData = await getTopAlbums('artist', artistName)
        setArtistTopAlbums(artistTopAlbumsData)

        const similarArtistsData = await getSimilarArtists(artistName)
        setSimilarArtists(similarArtistsData)

        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistName}`,
    })
  }, [navigation])

  const listItemSimilarArtist = ({ item, index }) => {
    return (
      <ListItemsArtist
        onPress={itemSimilarArtistHandler.bind(
          this,
          item.artistName,
          item.artistImage300,
          item.playcount
        )}
        image={item.artistImage300}
        title={item.artistName}
        itemsNumber={similarArtists.length}
        index={index}
      />
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

  const itemSimilarArtistHandler = async (
    artistName,
    artistImage,
    playcount
  ) => {
    navigation.push('Artist Details', { artistName, artistImage, playcount })
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
            source={{ uri: artistImage }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
        <TitleH2 style={{ alignSelf: 'center', marginBottom: spacing.md }}>
          {artistName}
        </TitleH2>

        {!isLoading ? (
          <>
            {artistInfo ? (
              <View>
                <View style={{ paddingHorizontal: spacing.md }}>
                  <ItemStats
                    playcount={artistInfo.playcount}
                    userplaycount={artistInfo.userplaycount}
                    listeners={artistInfo.listeners}
                    topPlaycount={topPlaycount}
                  />
                </View>
                {artistInfo.bio ? (
                  <View style={styles.container}>
                    <DetailsTitle children="Biography" />
                    <TouchableItem
                      onPress={() => {
                        navigation.navigate('Biography', {
                          biography: artistInfo.bio,
                        })
                      }}
                      style={{ marginBottom: 8 }}
                    >
                      <TextH6 style={{ lineHeight: 18 }} numberOfLines={6}>
                        {artistInfo.bio}
                      </TextH6>
                    </TouchableItem>
                  </View>
                ) : null}
              </View>
            ) : null}

            {artistTopTracks && artistTopTracks.length !== 0 ? (
              <View style={styles.container}>
                <DetailsTitle children="Top Tracks" />
                {artistTopTracks.map((item) => (
                  <SimilarItem
                    title={item.trackName}
                    subtitle={item.albumName}
                    playcount={item.playcount}
                    image={item.albumArt}
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
              <View style={styles.container}>
                <DetailsTitle children="Top Albums" />
                {artistTopAlbums.map((item) => {
                  return (
                    <SimilarItem
                      title={item.albumName}
                      subtitle={item.releaseYear}
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
              <View style={{ flex: 1, paddingVertical: spacing.sm }}>
                <DetailsTitle
                  children="Similar Artists"
                  style={{ marginLeft: 20 }}
                />
                <FlatList
                  data={similarArtists}
                  renderItem={listItemSimilarArtist}
                  horizontal={true}
                  ItemSeparatorComponent={listItemSeparator}
                />
              </View>
            ) : null}
          </>
        ) : (
          <LoadingContainer style={{ padding: 40 }} />
        )}
      </View>
    </ScrollView>
  )
}

export default ArtistDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
})
