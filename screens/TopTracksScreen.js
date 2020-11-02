import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react'

import LoadingContainer from '../components/UI/LoadingContainer'
import FlatListItems from '../components/FlatListItems'
import NewListItem from '../components/NewListItem'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import PeriodSelector from '../components/PeriodSelector'
import ErrorContainer from '../components/UI/ErrorContainer'

import { periods } from '../utils/lastfm'

import * as scrobblesActions from '../store/scrobblesActions'
import { useDispatch, useSelector } from 'react-redux'

const TopTracksScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLoading, setIsFirstLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState({})
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const topTracks = useSelector((state) => state.scrobbles.topTracks)

  const getTopTracksHandler = useCallback(
    async (period) => {
      setIsLoading(true)
      setError(null)
      try {
        await dispatch(scrobblesActions.fetchTopTracks(period))
      } catch (error) {
        setError(error.message)
      }
      setPeriodSelected(period)
      setIsLoading(false)
    },
    [dispatch]
  )

  const itemSelectHandler = (artistName, trackName, albumImage) => {
    navigation.navigate('Track Details', { artistName, trackName, albumImage })
  }

  const listItem = ({ item }) => {
    return (
      <NewListItem
        image={item.albumImage300}
        title={item.trackName}
        subtitle={item.artistName}
        playCount={item.playCount}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onSelect={itemSelectHandler.bind(
          this,
          item.artistName,
          item.trackName,
          item.albumImage640
        )}
      />
    )
  }

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopTracksHandler} />
  }

  const onRefreshHandler = () => {
    setIsRefreshing(true)
    getTopTracksHandler(periodSelected).then(() => {
      setIsRefreshing(false)
    })
  }

  useEffect(() => {
    setIsFirstLoading(true)
    getTopTracksHandler(periods[0]).then(() => {
      setIsFirstLoading(false)
    })
  }, [])

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

  if (isFirstLoading) {
    return <LoadingContainer />
  }

  if (error) {
    return <ErrorContainer error={error} />
  }

  return (
    <FlatListItems
      data={topTracks}
      renderItem={listItem}
      onRefresh={onRefreshHandler}
      isRefreshing={isRefreshing}
    />
  )
}

export default TopTracksScreen
