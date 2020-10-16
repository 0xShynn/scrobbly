import React, { useCallback, useEffect, useState } from 'react'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'
import ListItemCover from '../components/ListItemCover'
import FlatListItemsCover from '../components/FlatListItemsCover'

const TopAlbumsScreen = (props) => {
  const [topAlbums, setTopAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getTopAlbumsHandler = useCallback(async () => {
    const getTopAlbums = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&limit=20&period=7day&format=json`

    try {
      const response = await fetch(baseUrl + getTopAlbums)
      const resData = await response.json()
      setTopAlbums(resData.topalbums.album)
      // console.log(topAlbums)
    } catch (error) {
      console.log(error)
    }
  }, [getTopAlbumsHandler, setIsLoading])

  const itemSelectHandler = (artistName, albumName, albumArt) => {
    props.navigation.navigate('Album Details', {
      artistName,
      albumArt,
      albumName,
    })
  }

  const listItem = ({ item }) => {
    const albumArt = item.image[3]['#text']
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
    getTopAlbumsHandler().then(() => {
      setIsLoading(false)
    })
  }, [getTopAlbumsHandler, setIsLoading])

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatListItemsCover
        data={topAlbums}
        renderItem={listItem}
        onRefresh={getTopAlbumsHandler}
        isRefreshing={isRefreshing}
      />
    )
  }
}

export default TopAlbumsScreen
