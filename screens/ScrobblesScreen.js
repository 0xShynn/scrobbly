import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View, StatusBar, TouchableWithoutFeedback } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as scrobblesActions from '../store/scrobblesActions'
import { SimpleLineIcons } from '@expo/vector-icons'

import FlatListItems from '../components/FlatListItems'
import ListItem from '../components/ListItem'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import LoadingContainer from '../components/UI/LoadingContainer'
import ErrorContainer from '../components/UI/ErrorContainer'

import myColors from '../constants/myColors'
import spacing from '../constants/spacing'

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
      await dispatch(scrobblesActions.fetchUserScrobbles())
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
      <ListItem
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

  const settingsHandler = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('My Account')
        }}
      >
        <SimpleLineIcons
          name="settings"
          size={24}
          color="white"
          style={{ marginHorizontal: spacing.md }}
        />
      </TouchableWithoutFeedback>
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
      headerRight: settingsHandler,
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
