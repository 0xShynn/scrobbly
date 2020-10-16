import React, { useCallback, useEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'

import LoadingContainer from '../components/UI/LoadingContainer'
import NewListItem from '../components/NewListItem'
import { api_key, baseUrl, username } from '../utils/lastfm'
import myColors from '../constants/myColors'
import FlatListItems from '../components/FlatListItems'

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
    const getRecentTracks = `?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json`
    setIsRefreshing(true)

    const response = await fetch(baseUrl + getRecentTracks)
    const resData = await response.json()
    setRecentTracks(resData.recenttracks.track)

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
    const albumArt = item.image[3]['#text']
    const albumName = item.album['#text']
    const artistName = item.artist['#text']
    const trackName = item.name
    const isNowPlaying = item['@attr']
    const date = item.date

    return (
      <NewListItem
        image={albumArt}
        title={trackName}
        subtitle={artistName}
        nowPlaying={isNowPlaying ? isNowPlaying : false}
        date={date}
        onSelect={itemSelectHandler.bind(
          this,
          artistName,
          trackName,
          albumArt,
          albumName
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
