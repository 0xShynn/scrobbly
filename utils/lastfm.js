import Album from '../models/album'
import Artist from '../models/artist'
import Scrobble from '../models/scrobble'
import { image_blank_300 } from './expo'

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
    const lastFmBlankImageFilename = new RegExp(
      '2a96cbd8b46e442fc41c2b86b821562f'
    )
    let isAlbumImageBlank
    let spotifyTrackData

    for (const track of response.recenttracks.track) {
      let trackAlbumImage = track.image[2]['#text']
      isAlbumImageBlank = lastFmBlankImageFilename.test(trackAlbumImage)

      if (isAlbumImageBlank) {
        spotifyTrackData = await getSpotifyTrackInfo(
          track.artist['#text'],
          track.name
        )
        trackAlbumImage = spotifyTrackData.image_300
      }

      data.push(
        new Scrobble(
          track.artist['#text'],
          track.name,
          track.album['#text'],
          trackAlbumImage,
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

export const getTopAlbums = async (
  methodSelected,
  artistName,
  username,
  period
) => {
  const encodedArtistName = encodeURIComponent(artistName)
  let methodUrl
  if (methodSelected === 'user') {
    methodUrl = `?method=${methodSelected}.gettopalbums&user=${username}&period=${period.duration}&limit=20`
  }
  if (methodSelected === 'artist') {
    methodUrl = `?method=${methodSelected}.gettopalbums&artist=${encodedArtistName}&limit=5`
  }
  methodUrl += `&api_key=${api_key}&format=json`

  try {
    const response = await fetch(baseUrl + methodUrl).then((res) => res.json())

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
          spotifyAlbumData !== null
            ? spotifyAlbumData.albumArt300
            : album.image[2]['#text'] !== ''
            ? album.image[2]['#text']
            : image_blank_300,
          album.playcount
        )
      )
    }
    data.sort((a, b) => b.playcount - a.playcount)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTopTracks = async (
  methodSelected,
  artistName,
  username,
  period
) => {
  const encodedArtistName = encodeURIComponent(artistName)
  let methodUrl
  if (methodSelected === 'user') {
    methodUrl = `?method=user.gettoptracks&user=${username}&period=${period.duration}&limit=20`
  }
  if (methodSelected === 'artist') {
    methodUrl = `?method=artist.gettoptracks&artist=${encodedArtistName}&limit=5`
  }
  methodUrl += `&api_key=${api_key}&format=json`

  try {
    const response = await fetch(baseUrl + methodUrl).then((res) => res.json())

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
          spotifyData !== null ? spotifyData.albumName : '',
          spotifyData !== null
            ? spotifyData.image_300
            : track.image[2]['#text'] !== ''
            ? track.image[2]['#text']
            : image_blank_300,
          false,
          track.playcount,
          undefined,
          track['@attr'].rank
        )
      )
    }
    data.sort((a, b) => b.playcount - a.playcount)
    return data
  } catch (error) {
    throw error
  }
}

export const getArtistInfo = async (username, artistName) => {
  const encodedArtistName = encodeURIComponent(artistName)
  const method = `?method=artist.getinfo&artist=${encodedArtistName}&username=${username}&api_key=${api_key}&format=json`

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
  const encodedArtistName = encodeURIComponent(artistName)
  const encodedAlbumName = encodeURIComponent(albumName)
  const method = `?method=album.getinfo&api_key=${api_key}&artist=${encodedArtistName}&album=${encodedAlbumName}&username=${username}&format=json`

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
  const encodedArtistName = encodeURIComponent(artistName)
  const encodedTrackName = encodeURIComponent(trackName)

  const method = `?method=track.getInfo&api_key=${api_key}&artist=${encodedArtistName}&track=${encodedTrackName}&username=${username}&format=json&autocorrect=1`

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

export const getSimilarArtists = async (artistName) => {
  const encodedArtistName = encodeURIComponent(artistName)
  const method = `?method=artist.getsimilar&artist=${encodedArtistName}&api_key=${api_key}&limit=8&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())
    const data = []

    if (response.similarartists.artist.length === 0) {
      console.log(artistName + ' : No similar artists were found.')
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

export const getSimilarTracks = async (artistName, trackName) => {
  const encodedArtistName = encodeURIComponent(artistName)
  const encodedTrackName = encodeURIComponent(trackName)
  const method = `?method=track.getsimilar&artist=${encodedArtistName}&track=${encodedTrackName}&api_key=${api_key}&limit=5&format=json`

  try {
    const response = await fetch(baseUrl + method).then((res) => res.json())
    const data = []

    if (response.similartracks.track.length === 0) {
      console.log(
        artistName + ' - ' + trackName + ' : No similar tracks were found.'
      )
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
