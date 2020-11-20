import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as scrobblesActions from '../store/scrobblesActions'

import LoadingContainer from '../components/UI/LoadingContainer'
import FlatListItems from '../components/FlatListItems'
import NewListItem from '../components/NewListItem'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import ErrorContainer from '../components/UI/ErrorContainer'

import myColors from '../constants/myColors'
import { SimpleLineIcons } from '@expo/vector-icons'

const listHeader = () => (
  <View>
    <StatusBar
      barStyle="light-content"
      backgroundColor={myColors.cool_gray_900}
    />
  </View>
)

const ScrobblesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const recentTracks = useSelector((state) => state.scrobbles.recentScrobbles)
  const dispatch = useDispatch()

  const getScrobblesHandler = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      await dispatch(scrobblesActions.fetchScrobbles())
    } catch (error) {
      setError(error.message)
    }
    setIsRefreshing(false)
  }, [])

  const itemSelectHandler = (artistName, trackName, albumArt, albumName) => {
    navigation.navigate('Scrobble Details', {
      artistName,
      trackName,
      albumArt,
      albumName,
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
        onPress={itemSelectHandler.bind(
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
  }, [])

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
  }

  if (error) {
    return <ErrorContainer error={error} />
  }

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

export default ScrobblesScreen
