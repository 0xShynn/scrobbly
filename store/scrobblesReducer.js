import {
  SET_USER_SCROBBLES,
  SET_USER_ALBUMS,
  SET_USER_TOP_ARTISTS,
  SET_USER_TOP_TRACKS,
} from "./scrobblesActions";

const initialState = {
  topArtists: [],
  topAlbums: [],
  topTracks: [],
  recentScrobbles: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_SCROBBLES:
      return { ...state, recentScrobbles: payload };
    case SET_USER_ALBUMS:
      return {
        ...state,
        topAlbums: payload,
      };
    case SET_USER_TOP_TRACKS:
      return {
        ...state,
        topTracks: payload,
      };
    case SET_USER_TOP_ARTISTS:
      return {
        ...state,
        topArtists: payload,
      };
    default:
      return state;
  }
};
