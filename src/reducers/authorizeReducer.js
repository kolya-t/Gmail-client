import {AUTHORIZE_SUCCESS, GAPI_LOAD_SUCCESS, UNAUTHORIZED} from '../constants'

const initialState = {
  isGapiLoaded: false,
  isAuthenticated: false
};

export default function authorizeReducer(state = initialState, action) {
  switch (action.type) {
    case GAPI_LOAD_SUCCESS:
      return {
        ...state,
        isGapiLoaded: true
      };
    case AUTHORIZE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case UNAUTHORIZED:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}