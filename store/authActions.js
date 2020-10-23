import * as Crypto from 'expo-crypto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from '../utils/lastfm'

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (username, token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, username, token })
  }
}

export const logIn = (username, password) => {
  return async (dispatch) => {
    const signature =
      'api_key' +
      process.env.LASTFM_API_KEY +
      'methodauth.getMobileSession' +
      'password' +
      password +
      'username' +
      username +
      process.env.LASTFM_SECRET

    const hashedSignature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.MD5,
      signature
    )

    const response = await fetch(
      `${baseUrl}?method=auth.getMobileSession&api_key=${process.env.LASTFM_API_KEY}&password=${password}&username=${username}&api_sig=${hashedSignature}&format=json`,
      {
        method: 'POST',
      }
    )

    const resData = await response.json()

    if (resData.hasOwnProperty('error')) {
      throw new Error(resData.message)
    } else {
      dispatch(authenticate(resData.session.key, resData.session.name))
      saveDataToStorage(resData.session.key, resData.session.name)
    }
  }
}

export const logOut = () => {
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const saveDataToStorage = (username, token) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      username,
      token,
    })
  )
}
