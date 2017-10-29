export const GAPI_LOAD_SUCCESS = 'GAPI_LOAD_SUCCESS';
export const AUTHORIZE_SUCCESS = 'AUTHORIZE_SUCCESS';
export const UNAUTHORIZED = 'UNAUTHORIZED';

export const gapiLoadSuccess = () => ({type: GAPI_LOAD_SUCCESS});
export const authorizeSuccess = () => ({type: AUTHORIZE_SUCCESS});
export const unauthorized = () => ({type: UNAUTHORIZED});