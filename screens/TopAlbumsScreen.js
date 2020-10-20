import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import LoadingContainer from '../components/UI/LoadingContainer'
import ListItemCover from '../components/ListItemCover'
import FlatListItemsCover from '../components/FlatListItemsCover'
import PeriodSelector from '../components/PeriodSelector'
import CustomHeaderTitle from '../components/CustomHeaderTitle'

import { api_key, baseUrl, periods, username } from '../utils/lastfm'
import Album from '../models/album'

const TopAlbumsScreen = ({ navigation }) => {
  const [topAlbums, setTopAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState(periods[0])

  const getTopAlbumsHandler = useCallback(
    async (period) => {
      const getTopAlbums = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&period=${period.duration}&format=json`

      const response = await fetch(baseUrl + getTopAlbums)
      const resData = await response.json()

      const loadedAlbums = []
      for (const album of resData.topalbums.album) {
        loadedAlbums.push(
          new Album(
            album.artist.name,
            album.name,
            album.image[3]['#text']
              ? album.image[3]['#text']
              : 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png',
            album.playcount
          )
        )
      }
      loadedAlbums.slice(0, 20)
      setTopAlbums(loadedAlbums)
      setPeriodSelected(period)
    },
    [getTopAlbumsHandler, setPeriodSelected]
  )

  const itemSelectHandler = (artistName, albumName, albumArt) => {
    navigation.navigate('Album Details', {
      artistName,
      albumArt,
      albumName,
    })
  }

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopAlbumsHandler} />
  }

  const onRefreshHandler = () => {
    return getTopAlbumsHandler
  }

  const listItem = ({ item }) => {
    return (
      <ListItemCover
        image={item.albumArt}
        title={item.albumName}
        subtitle={item.artistName}
        playcount={item.playCount}
        onSelect={itemSelectHandler.bind(
          this,
          item.artistName,
          item.albumName,
          item.albumArt
        )}
      />
    )
  }

  useEffect(() => {
    setIsLoading(true)
    setIsRefreshing(true)
    getTopAlbumsHandler(periodSelected).then(() => {
      setIsLoading(false)
      setIsRefreshing(false)
    })
  }, [periodSelected])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <CustomHeaderTitle
          title="Top Albums"
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
      <FlatListItemsCover
        data={topAlbums}
        renderItem={listItem}
        onRefresh={onRefreshHandler}
        isRefreshing={isRefreshing}
      />
    )
  }
}

export default TopAlbumsScreen
