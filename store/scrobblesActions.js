import {
  getUserTopArtists,
  getUserScrobbles,
  getTopAlbums,
  getTopTracks,
} from "../utils/lastfm";

export const SET_USER_SCROBBLES = "SET_USER_SCROBBLES";
export const SET_USER_ALBUMS = "SET_USER_ALBUMS";
export const SET_USER_TOP_TRACKS = "SET_USER_TOP_TRACKS";
export const SET_USER_TOP_ARTISTS = "SET_USER_TOP_ARTISTS";
export const SET_USER_INFO = "SET_USER_INFO";

export const fetchUserScrobbles = () => {
  return async (dispatch, getState) => {
    const { username } = getState().auth;
    const loadedUserScrobbles = await getUserScrobbles(username);
    dispatch({
      type: SET_USER_SCROBBLES,
      payload: loadedUserScrobbles,
    });
  };
};

export const fetchUserTopAlbums = (period) => {
  return async (dispatch, getState) => {
    const { username } = getState().auth;
    const loadedUserTopAlbums = await getTopAlbums(
      "user",
      undefined,
      username,
      period
    );
    dispatch({
      type: SET_USER_ALBUMS,
      payload: loadedUserTopAlbums,
    });
  };
};

export const fetchUserTopTracks = (period) => {
  return async (dispatch, getState) => {
    const { username } = getState().auth;
    const loadedUserTopTracks = await getTopTracks(
      "user",
      undefined,
      username,
      period
    );
    dispatch({
      type: SET_USER_TOP_TRACKS,
      payload: loadedUserTopTracks,
    });
  };
};

export const fetchUserTopArtists = (period) => {
  return async (dispatch, getState) => {
    const { username } = getState().auth;
    const loadedUserTopTracks = await getUserTopArtists(username, period);
    dispatch({
      type: SET_USER_TOP_ARTISTS,
      payload: loadedUserTopTracks,
    });
  };
};
