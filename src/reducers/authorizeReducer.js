import {GAPI_LOAD_SUCCESS, AUTHORIZE_SUCCESS, UNAUTHORIZE_SUCCESS} from '../constants'

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
    case UNAUTHORIZE_SUCCESS:
      return {
        ...initialState,
        isAuthenticated: false
      };
    default:
      return state;
  }
}