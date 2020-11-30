import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as scrobblesActions from '../store/scrobblesActions'

import ListItemCover from '../components/ListItemCover'
import FlatListItemsCover from '../components/FlatListItemsCover'
import PeriodSelector from '../components/PeriodSelector'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import LoadingContainer from '../components/UI/LoadingContainer'
import ErrorContainer from '../components/UI/ErrorContainer'

import { periods } from '../utils/lastfm'

const TopAlbumsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLoading, setIsFirstLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState({})
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const topAlbums = useSelector((state) => state.scrobbles.topAlbums)

  const getTopAlbumsHandler = useCallback(
    async (period) => {
      setIsLoading(true)
      setError(null)
      try {
        await dispatch(scrobblesActions.fetchUserTopAlbums(period, '30'))
      } catch (error) {
        setError(error.message)
      }
      setPeriodSelected(period)
      setIsLoading(false)
    },
    [dispatch]
  )

  const itemSelectHandler = (artistName, albumName, albumArt, playcount) => {
    navigation.navigate('Album Details', {
      artistName,
      albumArt,
      albumName,
      topPlaycount: playcount,
    })
  }

  const listItem = ({ item }) => {
    return (
      <ListItemCover
        image={item.albumArt}
        title={item.albumName}
        subtitle={item.artistName}
        playcount={item.playcount}
        onSelect={itemSelectHandler.bind(
          this,
          item.artistName,
          item.albumName,
          item.albumArt,
          item.playcount
        )}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
      />
    )
  }

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopAlbumsHandler} />
  }

  const onRefreshHandler = () => {
    setIsRefreshing(true)
    getTopAlbumsHandler(periodSelected).then(() => {
      setIsRefreshing(false)
    })
  }

  useEffect(() => {
    setIsFirstLoading(true)
    getTopAlbumsHandler(periods[0]).then(() => {
      setIsFirstLoading(false)
    })
  }, [])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <CustomHeaderTitle
          title="Top Albums"
          periodSelected={periodSelected.name}
          isRefreshing={isRefreshing}
          isLoading={isLoading}
        />
      ),
      headerRight: periodSelectorHandler,
    })
  }, [navigation, periodSelected, isLoading, isRefreshing])

  if (isFirstLoading) {
    return <LoadingContainer />
  }

  if (error) {
    return <ErrorContainer error={error} />
  }

  return (
    <FlatListItemsCover
      data={topAlbums}
      renderItem={listItem}
      onRefresh={onRefreshHandler}
      isRefreshing={isRefreshing}
    />
  )
}

export default TopAlbumsScreen
