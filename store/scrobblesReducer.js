import {
  SET_SCROBBLES,
  SET_TOP_ALBUMS,
  SET_TOP_ARTISTS,
} from './scrobblesActions'

const initialState = {
  topArtists: [],
  topAlbums: [],
  topTracks: [],
  recentScrobbles: [],
}

export default (state = initialState, { type, payload, period }) => {
  switch (type) {
    case SET_SCROBBLES:
      return { ...state, recentScrobbles: payload }
    case SET_TOP_ALBUMS:
      return {
        ...state,
        topAlbums: payload,
      }
    case SET_TOP_ARTISTS:
      return {
        ...state,
        topArtists: payload,
      }
    default:
      return state
  }
}
