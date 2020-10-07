import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, FlatList, StyleSheet, ImageBackground } from 'react-native'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const listItem = ({ item }) => {
  const albumArt = item.image[3]['#text']

  return (
    <ImageBackground
      source={{ uri: albumArt }}
      style={styles.listImageBackground}
    >
      <View style={styles.listItem}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.itemGradientInfo}
        />
        <View style={styles.itemPlaycountContainer}>
          <Ionicons
            name="ios-musical-notes"
            size={20}
            color="white"
            style={styles.itemIcon}
          />
          <Text style={styles.itemPlaycount}>{item.playcount}</Text>
        </View>
        <Text style={styles.itemAlbumName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemArtistName} numberOfLines={1}>
          {item.artist.name}
        </Text>
      </View>
    </ImageBackground>
  )
}

const listFooter = () => {
  return <View style={styles.listFooter} />
}

const TopAlbumsScreen = () => {
  const [topAlbums, setTopAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getTopAlbumsHandler = useCallback(async () => {
    const getTopAlbums = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&limit=20&period=1month&format=json`

    try {
      const response = await fetch(baseUrl + getTopAlbums)
      const resData = await response.json()
      setTopAlbums(resData.topalbums.album)
    } catch (error) {
      console.log(error)
    }
    console.log(topAlbums)
  }, [getTopAlbumsHandler, setIsLoading])

  useEffect(() => {
    setIsLoading(true)
    getTopAlbumsHandler().then(() => {
      setIsLoading(false)
    })
  }, [getTopAlbumsHandler, setIsLoading])

  const keyExtractor = useCallback(
    (item) => item + Math.random().toString(),
    []
  )

  const listItemSeparator = () => <View style={styles.listItemSeparator} />

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatList
        data={topAlbums}
        renderItem={listItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={listItemSeparator}
        horizontal={false}
        numColumns={2}
        ListFooterComponent={listFooter}
        style={styles.listContainer}
      />
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 4,
    paddingTop: 20,
    paddingBottom: 20,
  },
  listFooter: {
    height: 40,
  },
  listImageBackground: {
    height: 190,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  listItem: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  listItemSeparator: {
    height: 12,
  },
  itemGradientInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  itemAlbumName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemArtistName: {
    fontSize: 14,
    color: '#CCC',
  },
  itemPlaycountContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemIcon: {
    alignSelf: 'center',
  },
  itemPlaycount: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
})

export default TopAlbumsScreen
