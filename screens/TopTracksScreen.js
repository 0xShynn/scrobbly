import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import FlatListItems from '../components/FlatListItems'
import NewListItem from '../components/NewListItem'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'

const TopTracksScreen = () => {
  const [topTracks, setTopTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getTopTracksHandler = useCallback(async () => {
    const getTopTracks = `?method=user.gettoptracks&user=${username}&api_key=${api_key}&period=7day&limit=30&format=json`
    setIsRefreshing(true)

    const response = await fetch(baseUrl + getTopTracks)
    const resData = await response.json()
    setTopTracks(resData.toptracks.track)

    setIsRefreshing(false)
  }, [setIsRefreshing, setTopTracks])

  useEffect(() => {
    setIsLoading(true)
    getTopTracksHandler().then(() => setIsLoading(false))
  }, [])

  const listItem = ({ item }) => {
    const albumArt = item.image[3]['#text']
    const artistName = item.artist.name
    const trackName = item.name
    const playCount = item.playcount

    return (
      <NewListItem
        image={albumArt}
        title={trackName}
        subtitle={artistName}
        playCount={playCount}
      />
    )
  }

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatListItems
        data={topTracks}
        renderItem={listItem}
        onRefresh={getTopTracksHandler}
        isRefreshing={isRefreshing}
      />
    )
  }
}

export default TopTracksScreen
