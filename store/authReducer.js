import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTOLOGIN } from "./authActions";

const initialState = {
  username: null,
  token: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        username: action.username,
        token: action.token,
        didTryAutoLogin: true,
      };

    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };

    case SET_DID_TRY_AUTOLOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    default:
      return state;
  }
};
