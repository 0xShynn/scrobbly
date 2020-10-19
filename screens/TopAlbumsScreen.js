import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, periods, username } from '../utils/lastfm'
import ListItemCover from '../components/ListItemCover'
import FlatListItemsCover from '../components/FlatListItemsCover'
import PeriodSelector from '../components/PeriodSelector'

const TopAlbumsScreen = ({ navigation }) => {
  const [topAlbums, setTopAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState(periods[0])

  const getTopAlbumsHandler = useCallback(
    async (period) => {
      const getTopAlbums = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&limit=20&period=${period.duration}&format=json`

      const response = await fetch(baseUrl + getTopAlbums)
      const resData = await response.json()
      setTopAlbums(resData.topalbums.album)
      setPeriodSelected(period)
    },
    [getTopAlbumsHandler, setIsRefreshing, setPeriodSelected]
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
    const albumArt = item.image[3]['#text']
      ? item.image[3]['#text']
      : 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
    const artistName = item.artist.name
    const albumName = item.name
    const playCount = item.playcount

    return (
      <ListItemCover
        image={albumArt}
        title={albumName}
        subtitle={artistName}
        playcount={playCount}
        onSelect={itemSelectHandler.bind(this, artistName, albumName, albumArt)}
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
      title: 'Top Albums ' + periodSelected.name,
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
