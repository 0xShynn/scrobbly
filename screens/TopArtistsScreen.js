import React, { useEffect, useState, useLayoutEffect } from 'react'
import LoadingContainer from '../components/UI/LoadingContainer'

import ListItemCover from '../components/ListItemCover'
import FlatListItemsCover from '../components/FlatListItemsCover'
import PeriodSelector from '../components/PeriodSelector'
import CustomHeaderTitle from '../components/CustomHeaderTitle'
import ErrorContainer from '../components/UI/ErrorContainer'

import { api_key, baseUrl, username, periods } from '../utils/lastfm'
import Artist from '../models/artist'

const TopArtistsScreen = ({ navigation }) => {
  const [topArtists, setTopArtists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [periodSelected, setPeriodSelected] = useState(periods[0])
  const [error, setError] = useState()

  const getTopArtistsHandler = async (period) => {
    setIsLoading(true)
    setError(null)

    const getTopArtists = `?method=user.gettopartists&user=${username}&api_key=${api_key}&period=${period.duration}&limit=20&format=json`

    const response = await fetch(baseUrl + getTopArtists).then((res) =>
      res.json()
    )

    if (response.hasOwnProperty('error')) {
      setError(response.message)
      setIsLoading(false)
    } else {
      const loadedArtists = []
      for (const artist of response.topartists.artist) {
        loadedArtists.push(
          new Artist(
            artist.name,
            artist.image[3]['#text']
              ? artist.image[3]['#text']
              : 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png',
            artist.playcount
          )
        )
      }

      setTopArtists(loadedArtists)
      setPeriodSelected(period)
      setIsLoading(false)
    }
  }

  const itemSelectHandler = (artist, playCount) => {
    navigation.navigate('Artist Details', { artist, playCount })
  }

  const listItem = ({ item }) => {
    return (
      <ListItemCover
        title={item.artistName}
        playcount={item.playCount}
        image={item.artistImage}
        onSelect={itemSelectHandler.bind(this, item.artistName, item.playCount)}
      />
    )
  }

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopArtistsHandler} />
  }

  const onRefreshHandler = () => {
    return getTopArtistsHandler
  }

  useEffect(() => {
    setIsLoading(true)
    setIsRefreshing(true)
    getTopArtistsHandler(periodSelected).then(() => {
      setIsLoading(false)
      setIsRefreshing(false)
    })
  }, [periodSelected])

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

  if (error) {
    return <ErrorContainer message={error} />
  }

  if (isLoading) {
    return <LoadingContainer />
  } else {
    return (
      <FlatListItemsCover
        data={topArtists}
        renderItem={listItem}
        onRefresh={onRefreshHandler}
        isRefreshing={isRefreshing}
      />
    )
  }
}

export default TopArtistsScreen
