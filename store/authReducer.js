import { AUTHENTICATE, LOGOUT } from './authActions'

const initialState = {
  username: null,
  token: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        username: action.username,
        token: action.token,
      }

    case LOGOUT:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
