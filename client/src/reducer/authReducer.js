import * as actionTypes from "./actionTypes";

let initialState = {
  isAuth: false,
  token: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION:
      return {
        ...state,
        isAuth: true,
        token: action.token,
      };
    case actionTypes.AUTH_CHECK_UPDATE:
      return {
        ...state,
        token: action.token,
        isAuth: action.isAuth,
      };
    case actionTypes.LOGOUT:
      return {
        isAuth: false,
        token: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
