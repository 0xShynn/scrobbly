import React, { useEffect, useState } from 'react'
import LoadingContainer from '../components/UI/LoadingContainer'
import { api_key, baseUrl, username } from '../utils/lastfm'

import ListItemCover from '../components/ListItemCover'
import FlatListItemsCover from '../components/FlatListItemsCover'

const TopArtistsScreen = (props) => {
  const [topArtists, setTopArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()

  const getTopArtistsHandler = async () => {
    const getTopArtists = `?method=user.gettopartists&user=${username}&api_key=${api_key}&period=7day&limit=20&format=json`

    try {
      const response = await fetch(baseUrl + getTopArtists)
      const resData = await response.json()
      setTopArtists(resData.topartists.artist)
    } catch (error) {
      console.log(error)
    }
  }

  const itemSelectHandler = (artist, playCount) => {
    props.navigation.navigate('Artist Details', { artist, playCount })
  }

  const listItem = ({ item }) => {
    const artistName = item.name
    const playCount = item.playcount
    const image = item.image[3]['#text']

    return (
      <ListItemCover
        title={artistName}
        playcount={playCount}
        image={image}
        onSelect={itemSelectHandler.bind(this, artistName, playCount)}
      />
    )
  }

  useEffect(() => {
    setIsLoading(true)
    getTopArtistsHandler().then(() => setIsLoading(false))
  }, [])

  const handleChange = (newValue) => {
    setIsRefreshing(newValue)
  }

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatListItemsCover
        data={topArtists}
        renderItem={listItem}
        onRefresh={getTopArtistsHandler}
        isRefreshing={isRefreshing}
      />
    )
  }
}

export default TopArtistsScreen
