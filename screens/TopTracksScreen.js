import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as scrobblesActions from '../store/scrobblesActions'
import { useScrollToTop } from '@react-navigation/native'

import FlatListItems from '../components/FlatListItems'
import ListItem from '../components/ListItem'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import PeriodSelector from '../components/PeriodSelector'
import ErrorContainer from '../components/UI/ErrorContainer'
import LoadingContainer from '../components/UI/LoadingContainer'

import { periods } from '../utils/lastfm'

const TopTracksScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLoading, setIsFirstLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState({})
  const dispatch = useDispatch()
  const topTracks = useSelector((state) => state.scrobbles.topTracks)
  const flatListRef = useRef()

  useEffect(() => {
    setIsFirstLoading(true)
    getTopTracksHandler(periods[0]).then(() => {
      setIsFirstLoading(false)
    })
  }, [])

  useScrollToTop(flatListRef)

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <CustomHeaderTitle
          title="Top Tracks"
          periodSelected={periodSelected.name}
          isRefreshing={isRefreshing}
          isLoading={isLoading}
        />
      ),
      headerRight: periodSelectorHandler,
    })
  }, [navigation, periodSelected, isLoading, isRefreshing])

  const getTopTracksHandler = useCallback(
    async (period) => {
      setIsLoading(true)
      setError(null)
      try {
        await dispatch(scrobblesActions.fetchUserTopTracks(period))
      } catch (error) {
        setError(error.message)
      }
      setPeriodSelected(period)
      setIsLoading(false)
    },
    [dispatch]
  )

  const itemSelectHandler = useCallback(
    (artistName, trackName, albumArt, albumName, topPlaycount) => {
      navigation.navigate('Scrobble Details', {
        artistName,
        trackName,
        albumArt,
        albumName,
        topPlaycount,
      })
    },
    []
  )

  const listItem = useCallback(({ item }) => {
    return (
      <ListItem
        image={item.albumArt}
        title={item.trackName}
        subtitle={item.artistName}
        playcount={item.playcount}
        rank={item.rank}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onPress={itemSelectHandler.bind(
          this,
          item.artistName,
          item.trackName,
          item.albumArt,
          item.albumName,
          item.playcount
        )}
      />
    )
  }, [])

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopTracksHandler} />
  }

  const onRefreshHandler = () => {
    setIsRefreshing(true)
    getTopTracksHandler(periodSelected).then(() => {
      setIsRefreshing(false)
    })
  }

  if (isFirstLoading) {
    return <LoadingContainer />
  }

  if (error) {
    return <ErrorContainer error={error} />
  }

  return (
    <FlatListItems
      ref={flatListRef}
      data={topTracks}
      renderItem={listItem}
      onRefresh={onRefreshHandler}
      isRefreshing={isRefreshing}
    />
  )
}

export default TopTracksScreen
