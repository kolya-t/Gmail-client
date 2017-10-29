export const GAPI_LOAD_SUCCESS = 'GAPI_LOAD_SUCCESS';
export const AUTHORIZE_SUCCESS = 'AUTHORIZE_SUCCESS';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const GET_INBOX_REQUEST = 'GET_INBOX_REQUEST';
export const GET_INBOX_SUCCESS = 'GET_INBOX_SUCCESS';

export const gapiLoadSuccess = () => ({type: GAPI_LOAD_SUCCESS});
export const authorizeSuccess = () => ({type: AUTHORIZE_SUCCESS});
export const unauthorized = () => ({type: UNAUTHORIZED});

export const getInboxRequest = () => ({type: GET_INBOX_REQUEST});
export const getInboxSuccess = (inbox) => ({type: GET_INBOX_SUCCESS, payload: inbox});