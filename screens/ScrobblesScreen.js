import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from 'react'
import { View, StatusBar, TouchableWithoutFeedback, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import * as scrobblesActions from '../store/scrobblesActions'
import { useScrollToTop } from '@react-navigation/native'

import FlatListItems from '../components/FlatListItems'
import ListItem from '../components/ListItem'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import LoadingContainer from '../components/UI/LoadingContainer'
import ErrorContainer from '../components/UI/ErrorContainer'

import myColors from '../constants/myColors'
import useColorScheme from '../hooks/useColorSchemeFix'

const listHeader = (isDarkTheme) => (
  <View>
    <StatusBar
      barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      backgroundColor={myColors.gray_900}
    />
  </View>
)

const ScrobblesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState()
  const recentTracks = useSelector((state) => state.scrobbles.recentScrobbles)
  const dispatch = useDispatch()
  const isDarkTheme = useColorScheme() === 'dark' ? true : false
  const flatListRef = useRef()

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await AsyncStorage.getItem('userData').then((res) =>
          JSON.parse(res)
        )
        setUserData(response.userInfo)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    getScrobblesHandler().then(() => setIsLoading(false))
  }, [])

  useScrollToTop(flatListRef)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: <CustomHeaderTitle title="Recent Scrobbles" />,
      headerRight: userProfilHandler,
    })
  }, [navigation, isDarkTheme, userData])

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

  const userProfilHandler = useCallback(() => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('My Account', { userData })
        }}
      >
        <Image
          source={{ uri: userData ? userData.image : null }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginRight: 15,
          }}
        />
      </TouchableWithoutFeedback>
    )
  }, [userData])

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

  if (isLoading) {
    return <LoadingContainer />
  }

  if (error) {
    return <ErrorContainer error={error} retryFunc={getScrobblesHandler} />
  }

  return (
    <FlatListItems
      ref={flatListRef}
      data={recentTracks}
      renderItem={listItem}
      ListHeaderComponent={listHeader.bind(this, isDarkTheme)}
      onRefresh={getScrobblesHandler}
      isRefreshing={isRefreshing}
    />
  )
}

export default ScrobblesScreen
