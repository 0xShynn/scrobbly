import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react'

import LoadingContainer from '../components/UI/LoadingContainer'
import FlatListItems from '../components/FlatListItems'
import NewListItem from '../components/NewListItem'
import CustomHeaderTitle from '../components/CustomHeaderTitle'

import { api_key, baseUrl, username, periods } from '../utils/lastfm'
import Track from '../models/track'
import PeriodSelector from '../components/PeriodSelector'

const TopTracksScreen = ({ navigation }) => {
  const [topTracks, setTopTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState(periods[0])

  const getTopTracksHandler = useCallback(
    async (period) => {
      const getTopTracks = `?method=user.gettoptracks&user=${username}&api_key=${api_key}&period=${period.duration}&format=json`

      const response = await fetch(baseUrl + getTopTracks)
      const resData = await response.json()
      const loadedTracks = []

      for (const track of resData.toptracks.track) {
        loadedTracks.push(
          new Track(
            track.artist.name,
            track.name,
            track.image[3]['#text'],
            track.duration,
            track.playcount
          )
        )
      }
      loadedTracks.slice(0, 30)
      setTopTracks(loadedTracks)
      setPeriodSelected(period)
    },
    [setTopTracks, setPeriodSelected]
  )

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopTracksHandler} />
  }

  const listItem = ({ item }) => {
    return (
      <NewListItem
        image={item.albumArt}
        title={item.trackName}
        subtitle={item.artistName}
        playCount={item.playCount}
      />
    )
  }

  useEffect(() => {
    setIsLoading(true)
    setIsRefreshing(true)
    getTopTracksHandler(periodSelected).then(() => {
      setIsLoading(false)
      setIsRefreshing(false)
    })
  }, [periodSelected])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <CustomHeaderTitle
          title="Top Tracks"
          periodSelected={periodSelected.name}
        />
      ),
      headerRight: periodSelectorHandler,
    })
  }, [navigation, periodSelected])

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
