import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'

import LoadingContainer from '../components/UI/LoadingContainer'
import FlatListItems from '../components/FlatListItems'
import NewListItem from '../components/NewListItem'

import { api_key, baseUrl, username } from '../utils/lastfm'
import myColors from '../constants/myColors'
import Scrobble from '../models/scrobble'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import { SimpleLineIcons } from '@expo/vector-icons'

const listHeader = () => (
  <View>
    <StatusBar barStyle="light-content" backgroundColor={myColors.primary} />
  </View>
)

const ScrobblesScreen = ({ navigation }) => {
  const [recentTracks, setRecentTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getScrobblesHandler = useCallback(async () => {
    const getRecentTracks = `?method=user.getrecenttracks&user=${username}&api_key=${api_key}&limit=50&page=1&format=json`
    setIsRefreshing(true)

    const response = await fetch(baseUrl + getRecentTracks)
    const resData = await response.json()

    const loadedScrobbles = []
    for (const track of resData.recenttracks.track) {
      loadedScrobbles.push(
        new Scrobble(
          track.artist['#text'],
          track.name,
          track.album['#text'],
          track.image[3]['#text'],
          track.hasOwnProperty(['@attr']) ? true : false,
          track.hasOwnProperty('date') ? track.date['#text'] : undefined
        )
      )
    }
    loadedScrobbles.slice(0, 50)
    setRecentTracks(loadedScrobbles)
    setIsRefreshing(false)
  }, [setRecentTracks, setIsRefreshing])

  const itemSelectHandler = (artist, title, image, album) => {
    navigation.navigate('Details', {
      artist,
      title,
      image,
      album,
    })
  }

  const listItem = useCallback(({ item }) => {
    return (
      <NewListItem
        image={item.albumArt}
        title={item.trackName}
        subtitle={item.artistName}
        nowPlaying={item.isNowPlaying}
        date={item.date}
        onSelect={itemSelectHandler.bind(
          this,
          item.artistName,
          item.trackName,
          item.albumArt,
          item.albumName
        )}
      />
    )
  }, [])

  const settingsSelector = () => {
    return (
      <SimpleLineIcons
        name="settings"
        size={24}
        color="white"
        style={{ marginHorizontal: 10 }}
      />
    )
  }

  useEffect(() => {
    setIsLoading(true)
    getScrobblesHandler().then(() => setIsLoading(false))
  }, [getScrobblesHandler, setIsLoading])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      // title: 'Top Artists / ' + periodSelected.name,
      headerTitle: <CustomHeaderTitle title="Scrobbles" />,
      headerRight: settingsSelector,
    })
  }, [navigation])

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatListItems
        data={recentTracks}
        renderItem={listItem}
        ListHeaderComponent={listHeader}
        onRefresh={getScrobblesHandler}
        isRefreshing={isRefreshing}
      />
    )
  }
}

export default ScrobblesScreen
