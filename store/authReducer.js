import { AUTHENTICATE } from './authActions'

const initialState = {
  token: null,
  username: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return { ...state, ...payload }

    default:
      return state
  }
}
