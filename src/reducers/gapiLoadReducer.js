import {GAPI_LOAD_REQUEST, GAPI_LOAD_SUCCESS} from '../constants'

const initialState = {
  isGapiLoaded: false
};

export default function authorizeReducer(state = initialState, action) {
  switch (action.type) {
    case GAPI_LOAD_REQUEST:
      return {
        isGapiLoaded: false
      };
    case GAPI_LOAD_SUCCESS:
      return {
        isGapiLoaded: true
      };
    default:
      return state;
  }
}