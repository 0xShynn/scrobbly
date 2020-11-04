import Album from '../models/album'
import Artist from '../models/artist'
import Scrobble from '../models/scrobble'
import Track from '../models/track'
import { image_blank_300 } from './expo'

import { getSpotifyTrackImage, getSpotifyArtistImage } from './spotify'

export const baseUrl = 'https://ws.audioscrobbler.com/2.0/'
export const api_key = process.env.LASTFM_API_KEY

export const periods = [
  { duration: '7day', name: 'Last 7 days' },
  { duration: '1month', name: 'Last 1 month' },
  { duration: '3month', name: 'Last 3 months' },
  { duration: '6month', name: 'Last 6 months' },
  { duration: '12month', name: 'Last 12 months' },
  { duration: 'overall', name: 'All time' },
]

export const getScrobbles = async (username) => {
  const method = `?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = []
    for (const track of response.recenttracks.track) {
      data.push(
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
    return data
  } catch (error) {
    throw error
  }
}

export const getTopTracks = async (username, period) => {
  const method = `?method=user.gettoptracks&user=${username}&api_key=${api_key}&period=${period.duration}&limit=20&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = []
    let spotifyTrackImage

    for (const track of response.toptracks.track) {
      spotifyTrackImage = await getSpotifyTrackImage(
        track.artist.name,
        track.name
      )
      data.push(
        new Track(
          track.artist.name,
          track.name,
          spotifyTrackImage.image_640,
          spotifyTrackImage.image_300,
          track.duration,
          track.playcount
        )
      )
    }
    return data
  } catch (error) {
    throw error
  }
}

export const getTopAlbums = async (username, period) => {
  const method = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&period=${period.duration}&limit=20&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = []
    for (const album of response.topalbums.album) {
      data.push(
        new Album(
          album.artist.name,
          album.name,
          album.image[3]['#text'] === ''
            ? image_blank_300
            : album.image[3]['#text'],
          album.playcount
        )
      )
    }
    return data
  } catch (error) {
    throw error
  }
}

export const getTopArtists = async (username, period) => {
  const method = `?method=user.gettopartists&user=${username}&api_key=${api_key}&period=${period.duration}&limit=30&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = []
    let imageFromSpotify

    for (const artist of response.topartists.artist) {
      imageFromSpotify = await getSpotifyArtistImage(artist.name)

      data.push(
        new Artist(
          artist.name,
          imageFromSpotify.image_640,
          imageFromSpotify.image_300,
          artist.playcount
        )
      )
    }
    return data
  } catch (error) {
    throw error
  }
}

export const getSimilarTracks = async (artist, track) => {
  const method = `?method=track.getsimilar&artist=${artist}&track=${track}&api_key=${api_key}&limit=6&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.similartracks.track.length === 0) {
      console.log('No similar tracks were found.')
      return
    }

    const data = []
    let spotifyTrackImage
    for (const track of response.similartracks.track) {
      spotifyTrackImage = await getSpotifyTrackImage(
        track.artist.name,
        track.name
      )
      data.push(
        new Scrobble(
          track.artist.name,
          track.name,
          undefined,
          spotifyTrackImage.image_300,
          false,
          undefined
        )
      )
    }
    return data
  } catch (error) {
    throw error
  }
}
