import AsyncStorage from '@react-native-community/async-storage'
import AlbumTrack from '../models/albumTrack'
import { image_blank_300, image_blank_640 } from './expo'
import prettyMilliseconds from 'pretty-ms'
import dayjs from 'dayjs'

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

export const getSpotifyTrackInfo = async (artist, track) => {
  const spotifyToken = await getSpotifyToken()

  let data = {
    image_640: image_blank_640,
    image_300: image_blank_300,
    artistId: '',
    albumName: '',
  }

  const regex = /[&]/gi
  const updatedTrack = track.replace(regex, '%26')

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=track:${updatedTrack}+artist:${artist}&type=track`,
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
        console.log(
          '[Similar Track] Nothing was found for : ' + track + ' from ' + artist
        )
        return null
      }

      // Match the artist name
      const selectedTrack = items.find(
        (track) => track.artists[0].name === artist
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

export const getSpotifyArtistInfo = async (artist) => {
  let image_640 = image_blank_640
  let image_300 = image_blank_300

  try {
    const {
      artists: { items },
    } = await spotifySearch(encodeURI(artist), 'artist')

    if (items.length === 0) {
      return { image_640, image_300 }
    }

    const selectedArtist = items.find(
      (item) => item.name.toLowerCase() === artist.toLowerCase()
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

export const getSpotifyAlbumInfo = async (artist, album) => {
  const spotifyToken = await getSpotifyToken()

  const albumId = await getSpotifyAlbumId(artist, album)

  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
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
    artistName: response.artists[0].name,
    artistId: response.artists[0].id,
    copyrights: response.copyrights[0]['text'],
    label: response.label,
    release_date: response.release_date,
    release_year: dayjs(response.release_date).format('YYYY'),
    total_length_text: '',
    total_tracks: response.total_tracks,
    track_word: 'tracks',
    tracklist: [],
  }

  let total_length_ms = 0
  let updatedDuration

  for (const item of response.tracks.items) {
    updatedDuration = prettyMilliseconds(item.duration_ms + 500, {
      secondsDecimalDigits: 0,
      colonNotation: true,
    })
    data.tracklist.push(
      new AlbumTrack(item.id, item.name, item.track_number, updatedDuration)
    )
    total_length_ms += item.duration_ms
  }

  // Set the tracks total length in minutes
  if (total_length_ms !== undefined) {
    data.total_length_text = prettyMilliseconds(total_length_ms + 500, {
      compact: true,
    })
  }

  if (data.tracklist.length <= 1) {
    data.track_word = 'track'
  }

  return data
}

export const getSpotifyAlbumId = async (artist, album) => {
  const spotifyToken = await getSpotifyToken()
  const updatedAlbum = encodeURIComponent(album)

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=album:${updatedAlbum}+artist:${artist}&type=album&limit=3`,
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

    const selectedAlbum = response.albums.items.find(
      (item) => item.name === album
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
