import Album from '../models/album'
import Artist from '../models/artist'
import Scrobble from '../models/scrobble'

import {
  getSpotifyTrackInfo,
  getSpotifyArtistInfo,
  getSpotifyAlbumInfo,
} from './spotify'

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

export const getUserScrobbles = async (username) => {
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

export const getUserTopTracks = async (username, period) => {
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

export const getUserTopAlbums = async (username, period) => {
  const method = `?method=user.gettopalbums&user=${username}&api_key=${api_key}&period=${period.duration}&limit=20&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = []
    let spotifyAlbumData
    for (const album of response.topalbums.album) {
      spotifyAlbumData = await getSpotifyAlbumInfo(
        album.artist.name,
        album.name
      )

      data.push(
        new Album(
          album.artist.name,
          album.name,
          spotifyAlbumData !== null
            ? spotifyAlbumData.albumArt300
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

export const getUserTopArtists = async (username, period) => {
  const method = `?method=user.gettopartists&user=${username}&api_key=${api_key}&period=${period.duration}&limit=30&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.message)
    }

    const data = []
    let imageFromSpotify

    for (const artist of response.topartists.artist) {
      imageFromSpotify = await getSpotifyArtistInfo(artist.name)

      data.push(
        new Artist(
          artist.name,
          imageFromSpotify.image_640,
          imageFromSpotify.image_300,
          artist.playcount,
          undefined
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

    const artistImage = await getSpotifyArtistInfo(artistName)

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
  const regex = /[&]/gi
  const updatedTrack = trackName.replace(regex, '%26')

  const method = `?method=track.getInfo&api_key=${api_key}&artist=${artistName}&track=${updatedTrack}&username=${username}&format=json&autocorrect=1`

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

export const getSimilarArtists = async (artistName) => {
  const method = `?method=artist.getsimilar&artist=${artistName}&api_key=${api_key}&limit=8&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())
    const data = []

    if (response.similarartists.artist.length === 0) {
      console.log('No similar artists were found.')
      return data
    }

    let spotifyArtistData
    for (const artist of response.similarartists.artist) {
      spotifyArtistData = await getSpotifyArtistInfo(artist.name)
      if (spotifyArtistData !== null) {
        data.push(
          new Artist(
            artist.name,
            spotifyArtistData.image_640,
            spotifyArtistData.image_300,
            undefined,
            artist.match
          )
        )
      }
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getArtistTopTracks = async (artistName) => {
  const method = `?method=artist.gettoptracks&artist=${artistName}&api_key=${api_key}&limit=5&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    const data = []

    if (response.toptracks.track.length === 0) {
      console.log('No tracks were found.')
      return data
    }

    let spotifyTracksData
    for (const track of response.toptracks.track) {
      spotifyTracksData = await getSpotifyTrackInfo(
        track.artist.name,
        track.name
      )

      data.push(
        new Scrobble(
          track.artist.name,
          track.name,
          spotifyTracksData.albumName,
          spotifyTracksData.image_300,
          false,
          track.playcount,
          undefined,
          undefined
        )
      )
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getArtistTopAlbums = async (artistName) => {
  const method = `?method=artist.gettopalbums&artist=${artistName}&api_key=${api_key}&limit=5&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())

    const data = []

    if (response.topalbums.album.length === 0) {
      console.log('No albums were found.')
      return data
    }

    let spotifyAlbumData
    for (const album of response.topalbums.album) {
      spotifyAlbumData = await getSpotifyAlbumInfo(
        album.artist.name,
        album.name
      )

      data.push(
        new Album(
          album.artist.name,
          album.name,
          spotifyAlbumData.albumArt300,
          album.playcount
        )
      )
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
