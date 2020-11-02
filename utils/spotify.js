import AsyncStorage from '@react-native-community/async-storage'
import AlbumTrack from '../models/albumTrack'
import { image_blank_300, image_blank_640 } from './expo'

export const getSpotifyToken = async () => {
  let spotifyToken = await AsyncStorage.getItem('spotifyToken').then((res) =>
    JSON.parse(res)
  )

  if (spotifyToken === null) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.SPOTIFY_BASE64_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: 'grant_type=client_credentials',
    }).then((res) => res.json())

    AsyncStorage.setItem('spotifyToken', JSON.stringify(response.access_token))

    const newSpotifyToken = response.access_token

    return newSpotifyToken
  } else {
    return spotifyToken
  }
}

export const getSpotifyTrackImage = async (artist, track) => {
  const spotifyToken = await getSpotifyToken()
  let image_640 = image_blank_640
  let image_300 = image_blank_300

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=track:${track}+artist:${artist}&type=track`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
    ).then((res) => res.json())

    // If a 'track + artist' search on Spotify gave nothing, do a simple search
    if (response.tracks.items.length === 0) {
      const {
        tracks: { items },
      } = await spotifySearch(track, 'track')

      if (items.length === 0) {
        console.log('Nothing was found for : ' + track + ' from ' + artist)
        throw new Exception()
      }

      // Match the artist name
      const result = items.find((track) => track.artists[0].name === artist)
      image_640 = result.album.images[0].url
      image_300 = result.album.images[1].url
      return { image_640, image_300 }
    }

    image_640 = response.tracks.items[0].album.images[0].url
    image_300 = response.tracks.items[0].album.images[1].url
    return { image_640, image_300 }
  } catch (error) {
    return { image_640, image_300 }
  }
}

export const getSpotifyArtistImage = async (artist) => {
  let image_640 = image_blank_640
  let image_300 = image_blank_300

  try {
    const {
      artists: { items },
    } = await spotifySearch(artist, 'artist')

    if (items.length === 0) {
      return { image_640, image_300 }
    }

    image_640 = items[0].images[0].url
    image_300 = items[0].images[1].url

    return { image_640, image_300 }
  } catch (error) {
    throw error
  }
}

export const getSpotifyAlbumId = async (artist, album) => {
  const spotifyToken = await getSpotifyToken()

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=album:${album}+artist:${artist}&type=album`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
    ).then((res) => res.json())

    if (response.hasOwnProperty('error')) {
      throw new Error(response.error)
    }

    const albumId = response.albums.items[0].id
    return albumId
  } catch (error) {
    throw error
  }
}

export const getSpotifyAlbumInfo = async (artist, album) => {
  const spotifyToken = await getSpotifyToken()

  const albumId = await getSpotifyAlbumId(artist, album)

  const response = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  ).then((res) => res.json())

  const data = response.items
  const tracklist = []
  for (const item of data) {
    tracklist.push(
      new AlbumTrack(item.id, item.name, item.track_number, item.duration_ms)
    )
  }

  return tracklist
}

const spotifySearch = async (item, type) => {
  const spotifyToken = await getSpotifyToken()

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${item}&type=${type}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  ).then((res) => res.json())

  return response
}
