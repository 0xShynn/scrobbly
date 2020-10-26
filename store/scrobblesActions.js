import { baseUrl, api_key, emptyImage } from '../utils/lastfm'
import AsyncStorage from '@react-native-community/async-storage'
import Scrobble from '../models/scrobble'
import Album from '../models/album'
import Artist from '../models/artist'

export const SET_SCROBBLES = 'SET_SCROBBLES'
export const SET_TOP_ALBUMS = 'SET_TOP_ALBUMS'
export const SET_TOP_ARTISTS = 'SET_TOP_ARTISTS'

export const fetchScrobbles = (username) => {
  return async (dispatch) => {
    try {
      const getRecentTracksMethod = `?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json`

      const response = await fetch(
        baseUrl + getRecentTracksMethod
      ).then((res) => res.json())

      const loadedScrobbles = []
      for (const track of response.recenttracks.track) {
        loadedScrobbles.push(
          new Scrobble(
            track.artist['#text'],
            track.name,
            track.album['#text'],
            track.image[3]['#text'],
            track.hasOwnProperty(['@attr']) ? true : false,
            track.hasOwnProperty('date') ? track.date['#text'] : undefined
          )
        )
      }
      dispatch({
        type: SET_SCROBBLES,
        payload: loadedScrobbles,
      })
    } catch (error) {
      throw error
    }
  }
}

export const fetchTopAlbums = (username, period) => {
  return async (dispatch) => {
    const getTopAlbumsMethod = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&period=${period.duration}&limit=20&format=json`

    try {
      const response = await fetch(baseUrl + getTopAlbumsMethod).then((res) =>
        res.json()
      )

      if (response.hasOwnProperty('error')) {
        console.log(response.message)
        throw new Error()
      }

      const loadedAlbums = []
      for (const album of response.topalbums.album) {
        loadedAlbums.push(
          new Album(
            album.artist.name,
            album.name,
            album.image[3]['#text'] ? album.image[3]['#text'] : emptyImage,
            album.playcount
          )
        )
      }
      dispatch({
        type: SET_TOP_ALBUMS,
        payload: loadedAlbums,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchTopArtists = (username, period) => {
  return async (dispatch) => {
    const getTopArtistsMethod = `?method=user.gettopartists&user=${username}&api_key=${api_key}&period=${period.duration}&limit=20&format=json`

    try {
      const response = await fetch(baseUrl + getTopArtistsMethod).then((res) =>
        res.json()
      )

      if (response.hasOwnProperty('error')) {
        console.log(response.message)
        throw new Error()
      }

      const loadedArtists = []

      const spotifyToken = await getSpotifyToken()
      let imageFromSpotify

      for (const artist of response.topartists.artist) {
        imageFromSpotify = await getSpotifyImage(artist.name, spotifyToken)
        loadedArtists.push(
          new Artist(artist.name, imageFromSpotify, artist.playcount)
        )
      }
      dispatch({ type: SET_TOP_ARTISTS, payload: loadedArtists })
    } catch (error) {
      console.log(error)
    }
  }
}

const getSpotifyToken = async () => {
  return await AsyncStorage.getItem('spotifyToken').then((res) =>
    JSON.parse(res)
  )
}

const getSpotifyImage = async (artist, spotifyToken) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  )
  const resData = await response.json()
  return resData.artists.items[0].images[0].url
}
