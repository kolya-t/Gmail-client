export const GAPI_LOAD_SUCCESS = 'GAPI_LOAD_SUCCESS';
export const AUTHORIZE_SUCCESS = 'AUTHORIZE_SUCCESS';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const GET_INBOX_REQUEST = 'GET_INBOX_REQUEST';
export const GET_INBOX_SUCCESS = 'GET_INBOX_SUCCESS';
export const GET_MESSAGE_REQUEST = 'GET_MESSAGE_REQUEST';
export const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS';
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

export const gapiLoadSuccess = () => ({type: GAPI_LOAD_SUCCESS});
export const authorizeSuccess = () => ({type: AUTHORIZE_SUCCESS});
export const unauthorized = () => ({type: UNAUTHORIZED});

export const getInboxRequest = () => ({type: GET_INBOX_REQUEST});
export const getInboxSuccess = (inbox) => ({type: GET_INBOX_SUCCESS, payload: inbox});
export const getMessageRequest = () => ({type: GET_MESSAGE_REQUEST});
export const getMessageSuccess = (message) => ({type: GET_MESSAGE_SUCCESS, payload: message});
export const sendMessageRequest = () => ({type: SEND_MESSAGE_REQUEST});
export const sendMessageSuccess = () => ({type: SEND_MESSAGE_SUCCESS});