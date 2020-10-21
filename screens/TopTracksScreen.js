import React, { useEffect, useLayoutEffect, useState } from 'react'

import LoadingContainer from '../components/UI/LoadingContainer'
import FlatListItems from '../components/FlatListItems'
import NewListItem from '../components/NewListItem'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import PeriodSelector from '../components/PeriodSelector'
import ErrorContainer from '../components/UI/ErrorContainer'

import { api_key, baseUrl, username, periods } from '../utils/lastfm'
import Track from '../models/track'

const TopTracksScreen = ({ navigation }) => {
  const [topTracks, setTopTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState(periods[0])
  const [error, setError] = useState()

  const getTopTracksHandler = async (period) => {
    if (period === periodSelected) {
      return
    }

    setIsLoading(true)
    setError(null)
    const getTopTracks = `?method=user.gettoptracks&user=${username}&api_key=${api_key}&period=${period.duration}&format=json`

    const response = await fetch(baseUrl + getTopTracks).then((res) =>
      res.json()
    )

    if (response.hasOwnProperty('error')) {
      setError(response.message)
      setIsLoading(false)
    } else {
      const loadedTracks = []
      for (const track of response.toptracks.track) {
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
      setIsLoading(false)
    }
  }

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

  const onRefreshHandler = () => {
    return getTopTracksHandler
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

  if (error) {
    return <ErrorContainer message={error} />
  }

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatListItems
        data={topTracks}
        renderItem={listItem}
        onRefresh={onRefreshHandler}
        isRefreshing={isRefreshing}
      />
    )
  }
}

export default TopTracksScreen
