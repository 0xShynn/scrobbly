import Album from '../models/album'
import Artist from '../models/artist'
import Scrobble from '../models/scrobble'
import { image_blank_300 } from './expo'

import { getSpotifyTrackInfo, getSpotifyArtistImage } from './spotify'

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
          track.playcount,
          track.hasOwnProperty('date') ? track.date['#text'] : undefined,
          undefined
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
    let spotifyData

    for (const track of response.toptracks.track) {
      spotifyData = await getSpotifyTrackInfo(track.artist.name, track.name)
      data.push(
        new Scrobble(
          track.artist.name,
          track.name,
          spotifyData.albumName,
          spotifyData.image_300,
          false,
          track.playcount,
          undefined,
          track['@attr'].rank
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

export const getArtistInfo = async (username, artistName) => {
  const method = `?method=artist.getinfo&artist=${artistName}&username=${username}&api_key=${api_key}&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const artistImage = await getSpotifyArtistImage(artistName)

    const data = {
      bio: response.artist.bio.content,
      summary: response.artist.bio.summary,
      playcount: response.artist.stats.playcount,
      listeners: response.artist.stats.listeners,
      image: artistImage.image_300,
    }
    return data
  } catch (error) {
    throw error
  }
}

export const getAlbumInfo = async (username, artistName, albumName) => {
  const method = `?method=album.getinfo&api_key=${api_key}&artist=${artistName}&album=${albumName}&username=${username}&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())
    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = response.album
    return data
  } catch (error) {
    throw error
  }
}

export const getTrackInfo = async (username, artistName, trackName) => {
  const method = `?method=track.getInfo&api_key=${api_key}&artist=${artistName}&track=${trackName}&username=${username}&format=json&autocorrect=1`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = {
      listeners: response.track.listeners,
      playcount: response.track.playcount,
      userplaycount: response.track.userplaycount,
    }

    return data
  } catch (error) {
    throw error
  }
}

export const getSimilarTracks = async (artist, track) => {
  const method = `?method=track.getsimilar&artist=${artist}&track=${track}&api_key=${api_key}&limit=5&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())
    const data = []

    if (response.similartracks.track.length === 0) {
      console.log('No similar tracks were found.')
      return data
    }

    let spotifyTrackData
    for (const track of response.similartracks.track) {
      spotifyTrackData = await getSpotifyTrackInfo(
        track.artist.name,
        track.name
      )

      if (spotifyTrackData !== null) {
        data.push(
          new Scrobble(
            track.artist.name,
            track.name,
            spotifyTrackData.albumName,
            spotifyTrackData.image_300,
            false,
            track.playcount,
            undefined,
            undefined
          )
        )
      }
    }
    return data
  } catch (error) {
    throw error
  }
}
