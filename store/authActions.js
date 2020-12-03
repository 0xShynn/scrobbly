import * as Crypto from 'expo-crypto'
import AsyncStorage from '@react-native-community/async-storage'
import { baseUrl, getLastfmUserInfo } from '../utils/lastfm'

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
export const SET_DID_TRY_AUTOLOGIN = 'SET_DID_TRY_AUTOLOGIN'

export const setDidTryAutoLogin = () => {
  return { type: SET_DID_TRY_AUTOLOGIN }
}

export const authenticate = (username, token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, username, token })
  }
}

export const logIn = (username, password) => {
  return async (dispatch) => {
    try {
      const signature =
        'api_key' +
        process.env.LASTFM_API_KEY +
        'methodauth.getMobileSession' +
        'password' +
        password +
        'username' +
        username +
        process.env.LASTFM_SECRET

      // LastFM api_sig requirement
      const hashedSignature = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        signature
      )

      const response = await fetch(
        `${baseUrl}?method=auth.getMobileSession&api_key=${process.env.LASTFM_API_KEY}&password=${password}&username=${username}&api_sig=${hashedSignature}&format=json`,
        {
          method: 'POST',
        }
      ).then((res) => res.json())

      if (response.hasOwnProperty('error')) {
        throw new Error(response.message)
      }

      const userInfoResponse = await getLastfmUserInfo(username)

      dispatch(authenticate(response.session.name, response.session.key))
      saveDataToStorage(
        response.session.name,
        response.session.key,
        userInfoResponse
      )
    } catch (error) {
      throw error
    }
  }
}

export const logOut = () => {
  AsyncStorage.removeItem('userData')
  AsyncStorage.removeItem('spotifyToken')
  return { type: LOGOUT }
}

const saveDataToStorage = (username, token, userInfo) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      username,
      token,
      userInfo,
    })
  )
}
