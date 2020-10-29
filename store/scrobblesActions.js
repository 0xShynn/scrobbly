import {
  getTopTracks,
  getTopArtists,
  getTopAlbums,
  getScrobbles,
} from '../utils/lastfm'

export const SET_SCROBBLES = 'SET_SCROBBLES'
export const SET_TOP_ALBUMS = 'SET_TOP_ALBUMS'
export const SET_TOP_TRACKS = 'SET_TOP_TRACKS'
export const SET_TOP_ARTISTS = 'SET_TOP_ARTISTS'
export const SET_USER_INFO = 'SET_USER_INFO'

export const fetchScrobbles = () => {
  return async (dispatch, getState) => {
    const username = getState().auth.username
    const loadedScrobbles = await getScrobbles(username)
    dispatch({
      type: SET_SCROBBLES,
      payload: loadedScrobbles,
    })
  }
}

export const fetchTopAlbums = (period) => {
  return async (dispatch, getState) => {
    const username = getState().auth.username
    const loadedAlbums = await getTopAlbums(username, period)
    dispatch({
      type: SET_TOP_ALBUMS,
      payload: loadedAlbums,
    })
  }
}

export const fetchTopTracks = (period) => {
  return async (dispatch, getState) => {
    const username = getState().auth.username
    const loadedTracks = await getTopTracks(username, period)
    dispatch({
      type: SET_TOP_TRACKS,
      payload: loadedTracks,
    })
  }
}

export const fetchTopArtists = (period) => {
  return async (dispatch, getState) => {
    const username = getState().auth.username
    const loadedArtists = await getTopArtists(username, period)
    dispatch({
      type: SET_TOP_ARTISTS,
      payload: loadedArtists,
    })
  }
}
