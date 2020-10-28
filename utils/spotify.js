import AsyncStorage from '@react-native-community/async-storage'

export const getSpotifyToken = async () => {
  let spotifyToken = await AsyncStorage.getItem('spotifyToken').then((res) =>
    JSON.parse(res)
  )

  if (spotifyToken === null) {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.SPOTIFY_BASE64_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: 'grant_type=client_credentials',
    }).then((res) => res.json())

    AsyncStorage.setItem('spotifyToken', JSON.stringify(result.access_token))

    return result.access_token
  } else {
    return spotifyToken
  }
}

export const getSpotifyTrackImage = async (artist, track) => {
  const spotifyToken = await getSpotifyToken()

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=track:${track}+artist:${artist}&type=track`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  ).then((res) => res.json())
  const image640 = response.tracks.items[0].album.images[0].url
  const image300 = response.tracks.items[0].album.images[1].url

  return { image640, image300 }
}

export const getSpotifyArtistImage = async (artist) => {
  const spotifyToken = await getSpotifyToken()

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  ).then((res) => res.json())
  const image640 = response.artists.items[0].images[0].url
  const image300 = response.artists.items[0].images[1].url

  return { image640, image300 }
}
