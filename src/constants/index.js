export const GAPI_LOAD_SUCCESS = 'GAPI_LOAD_SUCCESS';
export const AUTHORIZE_SUCCESS = 'AUTHORIZE_SUCCESS';
export const UNAUTHORIZE_SUCCESS = 'UNAUTHORIZE_SUCCESS';

export const gapiLoadSuccess = () => ({type: GAPI_LOAD_SUCCESS});
export const authorizeSuccess = () => ({type: AUTHORIZE_SUCCESS});
export const unauthorizeSuccess = () => ({type: UNAUTHORIZE_SUCCESS});