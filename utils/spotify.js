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

  console.log('the artist name is : ', artist)

  try {
    const {
      artists: { items },
    } = await spotifySearch(encodeURI(artist), 'artist')

    console.log('les items', items)

    if (items.length === 0) {
      return { image_640, image_300 }
    }

    const selectedArtist = items.find((item) => item.name === artist)

    console.log('selectedArtist', selectedArtist)

    image_640 = items[0].images[0].url
    image_300 = items[0].images[1].url

    return { image_640, image_300 }
  } catch (error) {
    throw error
  }
}

export const getSpotifyAlbumId = async (artist, album) => {
  const spotifyToken = await getSpotifyToken()

  // const regex = /[&]/gi
  // const updatedAlbum = album.replace(regex, '%26')
  // const updatedArtist = artist.replace(regex, '%26')
  // console.log(updatedArtist)

  const encodedAlbum = encodeURI(album)
  const encodedArtist = encodeURI(artist)

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=album:${encodedAlbum}+artist:${encodedArtist}&type=album&limit=3`,
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

    let albumId

    if (response.albums.items.length === 0) {
      const result = await spotifySearch(album, 'album')

      const selectedId = result.albums.items.find(
        (item) => item.artists[0].name.toLowerCase() === artist.toLowerCase()
      )

      if (selectedId === undefined) {
        return undefined
      }
      return selectedId.id
    }

    albumId = response.albums.items[0].id
    return albumId
  } catch (error) {
    throw error
  }
}

export const getSpotifyAlbumInfo = async (artist, album) => {
  const spotifyToken = await getSpotifyToken()

  const albumId = await getSpotifyAlbumId(artist, album)

  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
    },
  }).then((res) => res.json())

  console.log(response)

  let image_640
  let image_300
  let tracklist = []

  for (const item of response.tracks.items) {
    tracklist.push(
      new AlbumTrack(item.id, item.name, item.track_number, item.duration_ms)
    )
  }

  // // The album ID wasn't found, so we return blank images for the album art and also an empty tracklist
  // if (response.hasOwnProperty('error')) {
  //   image_640 = undefined
  //   image_300 = undefined

  //   return { image_640, image_300, tracklist }
  // }

  image_640 = response.images[0].url
  image_300 = response.images[1].url

  return { image_640, image_300, tracklist }
}

const spotifySearch = async (item, type) => {
  const spotifyToken = await getSpotifyToken()

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${item}&type=${type}&limit=3`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  ).then((res) => res.json())

  return response
}
