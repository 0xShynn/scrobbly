import AsyncStorage from '@react-native-async-storage/async-storage'
import AlbumTrack from '../models/albumTrack'
import { image_blank_300, image_blank_640 } from './expo'
import prettyMilliseconds from 'pretty-ms'
import dayjs from 'dayjs'

export const setSpotifyToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.SPOTIFY_BASE64_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: 'grant_type=client_credentials',
    }).then((res) => res.json())

    const expiryDate = +dayjs().format('X') + +response.expires_in
    const accessToken = response.access_token
    const spotifyToken = { token: accessToken, date: expiryDate }

    AsyncStorage.setItem('spotifyToken', JSON.stringify(spotifyToken))

    return spotifyToken
  } catch (error) {
    throw error
  }
}

export const getSpotifyToken = async () => {
  try {
    let spotifyToken = await AsyncStorage.getItem('spotifyToken').then((res) =>
      JSON.parse(res)
    )

    if (spotifyToken === null) {
      console.log('The Spotify token is null, a new one will be requested.')
      spotifyToken = await setSpotifyToken()
    }

    const currentDate = +dayjs().format('X')
    const timeLeft = spotifyToken.date - currentDate

    if (timeLeft <= 0) {
      console.log(
        'The Spotify token (1 hour) is expired, a new one will be requested.'
      )

      const newSpotifyToken = await setSpotifyToken()

      AsyncStorage.setItem(
        'spotifyToken',
        JSON.stringify({
          token: newSpotifyToken.token,
          date: newSpotifyToken.date,
        })
      )

      return newSpotifyToken
    }

    return spotifyToken
  } catch (error) {
    throw error
  }
}

export const getSpotifyTrackInfo = async (artistName, trackName) => {
  const spotifyToken = await getSpotifyToken()
  const encodedArtistName = encodeURIComponent(artistName)
  // Spotify search isn't working for items with the ' sign, so we need to remove it.
  const regex = /[']/gi
  const encodedTrackName = encodeURIComponent(trackName.replace(regex, ''))

  let data = {
    image_640: image_blank_640,
    image_300: image_blank_300,
    artistId: '',
    albumName: '',
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=track:${encodedTrackName}+artist:${encodedArtistName}&type=track`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotifyToken.token}`,
        },
      }
    ).then((res) => res.json())

    // If a 'track + artist' search on Spotify gave nothing, do a simple search
    if (response.tracks.items.length === 0) {
      const {
        tracks: { items },
      } = await spotifySearch(encodedTrackName, 'track')

      if (items.length === 0) {
        console.log(
          '[Similar track] > ' +
            artistName +
            ' - ' +
            trackName +
            ' : No data was found on Spotify.'
        )
        return null
      }

      // Match the artist name
      const selectedTrack = items.find(
        (track) => track.artists[0].name === artistName
      )

      if (selectedTrack !== undefined) {
        data = {
          image_640: selectedTrack.album.images[0].url,
          image_300: selectedTrack.album.images[1].url,
          artistId: selectedTrack.album.artists[0].id,
          albumName: selectedTrack.album.name,
        }
      }

      if (selectedTrack === undefined) {
        return null
      }
      return data
    }

    data = {
      image_640: response.tracks.items[0].album.images[0].url,
      image_300: response.tracks.items[0].album.images[1].url,
      artistId: response.tracks.items[0].artists[0].id,
      albumName: response.tracks.items[0].album.name,
    }

    return data
  } catch (error) {
    throw error
  }
}

export const getSpotifyArtistInfo = async (artistName) => {
  const encodedArtistName = encodeURIComponent(artistName)
  let image_640 = image_blank_640
  let image_300 = image_blank_300

  try {
    const {
      artists: { items },
    } = await spotifySearch(encodedArtistName, 'artist')

    if (items.length === 0) {
      return { image_640, image_300 }
    }

    const selectedArtist = items.find(
      (item) =>
        encodeURIComponent(item.name.toLowerCase()) ===
        encodeURIComponent(artistName.toLowerCase())
    )

    if (selectedArtist === undefined) {
      return null
    }

    if (
      selectedArtist.hasOwnProperty('images') &&
      selectedArtist.images.length !== 0
    ) {
      image_640 = selectedArtist.images[0].url
      image_300 = selectedArtist.images[1].url
    }

    return { image_640, image_300 }
  } catch (error) {
    throw error
  }
}

export const getSpotifyAlbumInfo = async (artistName, albumName) => {
  const encodedArtistName = encodeURIComponent(artistName)
  const encodedAlbumName = encodeURIComponent(albumName)
  const albumId = await getSpotifyAlbumId(encodedArtistName, encodedAlbumName)
  const spotifyToken = await getSpotifyToken()
  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotifyToken.token}`,
    },
  }).then((res) => res.json())

  // The album ID wasn't found, so we return blank images and empty tracklist
  if (response.hasOwnProperty('error')) {
    return null
  }

  const data = {
    albumArt640: response.images[0].url,
    albumArt300: response.images[1].url,
    albumId: response.id,
    albumName: response.name,
    artistName: response.artists[0].name,
    artistId: response.artists[0].id,
    copyrights: response.copyrights[0]['text'],
    label: response.label,
    total_length_text: response.total_tracks > 1 ? 'tracks' : 'track',
    total_tracks: response.total_tracks,
    release_date: response.release_date,
    release_year: dayjs(response.release_date).format('YYYY'),
  }

  return data
}

export const getSpotifyAlbumTracklist = async (artistName, albumName) => {
  const encodedArtistName = encodeURIComponent(artistName)
  const encodedAlbumName = encodeURIComponent(albumName)
  const albumId = await getSpotifyAlbumId(encodedArtistName, encodedAlbumName)
  const spotifyToken = await getSpotifyToken()

  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotifyToken.token}`,
    },
  }).then((res) => res.json())

  // The album ID wasn't found, so we return blank images and empty tracklist
  if (response.hasOwnProperty('error')) {
    return []
  }

  const tracklist = []
  let updatedDuration

  for (const item of response.tracks.items) {
    updatedDuration = prettyMilliseconds(item.duration_ms + 500, {
      secondsDecimalDigits: 0,
      colonNotation: true,
    })
    tracklist.push(
      new AlbumTrack(item.id, item.name, item.track_number, updatedDuration)
    )
  }

  return { tracklist }
}

export const getSpotifyAlbumId = async (artistName, albumName) => {
  const spotifyToken = await getSpotifyToken()

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=album:${albumName}+artist:${artistName}&type=album&limit=3`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotifyToken.token}`,
        },
      }
    ).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.error)
    }

    let albumId

    if (response.albums.items.length === 0) {
      const result = await spotifySearch(albumName, 'album')

      const selectedId = result.albums.items.find(
        (item) => encodeURIComponent(item.artists[0].name) == artistName
      )

      if (selectedId === undefined) {
        return undefined
      }
      return selectedId.id
    }

    albumId = response.albums.items[0].id

    const selectedAlbum = response.albums.items.find(
      (item) => encodeURIComponent(item.name) === albumName
    )

    if (selectedAlbum !== undefined) {
      albumId = selectedAlbum.id
    }

    return albumId
  } catch (error) {
    throw error
  }
}

const spotifySearch = async (item, type) => {
  const spotifyToken = await getSpotifyToken()

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${item}&type=${type}&limit=5`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotifyToken.token}`,
      },
    }
  ).then((res) => res.json())

  return response
}
