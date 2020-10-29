import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'

import LoadingContainer from '../components/UI/LoadingContainer'
import ListItemCover from '../components/ListItemCover'
import FlatListItemsCover from '../components/FlatListItemsCover'
import PeriodSelector from '../components/PeriodSelector'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import ErrorContainer from '../components/UI/ErrorContainer'

import { periods } from '../utils/lastfm'

import * as scrobblesActions from '../store/scrobblesActions'
import { useDispatch, useSelector } from 'react-redux'

const TopArtistsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLoading, setIsFirstLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState({})
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const topArtists = useSelector((state) => state.scrobbles.topArtists)

  const getTopArtistsHandler = useCallback(
    async (period) => {
      setIsLoading(true)
      setError(null)
      try {
        await dispatch(scrobblesActions.fetchTopArtists(period))
      } catch (error) {
        setError(error.message)
      }
      setPeriodSelected(period)
      setIsLoading(false)
    },
    [dispatch]
  )

  const itemSelectHandler = (artistName, artistImage, playCount) => {
    navigation.navigate('Artist Details', {
      artistName,
      artistImage,
      playCount,
    })
  }

  const listItem = ({ item }) => {
    return (
      <ListItemCover
        title={item.artistName}
        image={item.artistImage300}
        playcount={item.playCount}
        onSelect={itemSelectHandler.bind(
          this,
          item.artistName,
          item.artistImage640,
          item.playCount
        )}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
      />
    )
  }

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopArtistsHandler} />
  }

  const onRefreshHandler = () => {
    setIsRefreshing(true)
    getTopArtistsHandler(periodSelected).then(() => {
      setIsRefreshing(false)
    })
  }

  useEffect(() => {
    setIsFirstLoading(true)
    getTopArtistsHandler(periods[0]).then(() => {
      setIsFirstLoading(false)
    })
  }, [])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <CustomHeaderTitle
          title="Top Artists"
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
    <FlatListItemsCover
      data={topArtists}
      renderItem={listItem}
      onRefresh={onRefreshHandler}
      isRefreshing={isRefreshing}
    />
  )
}

export default TopArtistsScreen
