import React, { useCallback, useEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'

import LoadingContainer from '../components/UI/LoadingContainer'
import FlatListItems from '../components/FlatListItems'
import NewListItem from '../components/NewListItem'

import { api_key, baseUrl, username } from '../utils/lastfm'
import myColors from '../constants/myColors'
import Scrobble from '../models/scrobble'

const listHeader = () => (
  <View>
    <StatusBar barStyle="light-content" backgroundColor={myColors.primary} />
  </View>
)

const ScrobblesScreen = (props) => {
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

  useEffect(() => {
    setIsLoading(true)
    getScrobblesHandler().then(() => setIsLoading(false))
  }, [getScrobblesHandler, setIsLoading])

  const itemSelectHandler = (artist, title, image, album) => {
    props.navigation.navigate('Details', {
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
