import { baseUrl, api_key, emptyImage } from '../utils/lastfm'
import Scrobble from '../models/scrobble'
import Album from '../models/album'
import Artist from '../models/artist'
import Track from '../models/track'
import { getSpotifyArtistImage, getSpotifyTrackImage } from '../utils/spotify'

export const SET_SCROBBLES = 'SET_SCROBBLES'
export const SET_TOP_ALBUMS = 'SET_TOP_ALBUMS'
export const SET_TOP_TRACKS = 'SET_TOP_TRACKS'
export const SET_TOP_ARTISTS = 'SET_TOP_ARTISTS'
export const SET_USER_INFO = 'SET_USER_INFO'

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

export const fetchTopTracks = (username, period) => {
  return async (dispatch) => {
    const getTopTracksMethod = `?method=user.gettoptracks&user=${username}&api_key=${api_key}&period=${period.duration}&limit=20&format=json`

    try {
      const response = await fetch(baseUrl + getTopTracksMethod).then((res) =>
        res.json()
      )

      if (response.hasOwnProperty('error')) {
        console.log(response.message)
        throw new Error()
      }

      const loadedTracks = []
      let spotifyTrackImage

      for (const track of response.toptracks.track) {
        spotifyTrackImage = await getSpotifyTrackImage(
          track.artist.name,
          track.name
        )
        loadedTracks.push(
          new Track(
            track.artist.name,
            track.name,
            spotifyTrackImage,
            track.duration,
            track.playcount
          )
        )
      }
      dispatch({
        type: SET_TOP_TRACKS,
        payload: loadedTracks,
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
      let imageFromSpotify

      for (const artist of response.topartists.artist) {
        imageFromSpotify = await getSpotifyArtistImage(artist.name)
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

export const getUserInfo = (username) => {
  return async (dispatch) => {
    try {
      const getUserInfoMethod = `?method=user.getinfo&user=${username}&api_key=${api_key}&format=json`
      const response = await fetch(baseUrl + getUserInfoMethod).then((res) =>
        res.json()
      )

      if (response.hasOwnProperty('error')) {
        console.log(response.message)
        throw new Error()
      }
      console.log(response)

      dispatch({ type: SET_USER_INFO })
    } catch (error) {
      console.log(error)
    }
  }
}
