export const GAPI_LOAD_REQUEST = 'GAPI_LOAD_REQUEST';
export const GAPI_LOAD_SUCCESS = 'GAPI_LOAD_SUCCESS';
export const AUTHORIZED = 'AUTHORIZED';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const GET_MESSAGE_LIST_REQUEST = 'GET_MESSAGE_LIST_REQUEST';
export const GET_MESSAGE_LIST_SUCCESS = 'GET_MESSAGE_LIST_SUCCESS';
export const FETCH_MESSAGE_LIST_REQUEST = 'FETCH_MESSAGE_LIST_REQUEST';
export const FETCH_MESSAGE_LIST_SUCCESS = 'FETCH_MESSAGE_LIST_SUCCESS';
export const GET_MESSAGE_REQUEST = 'GET_MESSAGE_REQUEST';
export const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DOWNLOAD_ATTACHMENT_REQUEST = 'DOWNLOAD_ATTACHMENT_REQUEST';
export const DOWNLOAD_ATTACHMENT_SUCCESS = 'DOWNLOAD_ATTACHMENT_SUCCESS';
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

export const gapiLoadRequest = () => ({type: GAPI_LOAD_REQUEST});
export const gapiLoadSuccess = () => ({type: GAPI_LOAD_SUCCESS});

export const authorized = () => ({type: AUTHORIZED});
export const unauthorized = () => ({type: UNAUTHORIZED});

export const getMessageListRequest = () => ({type: GET_MESSAGE_LIST_REQUEST});
export const getMessageListSuccess = (messages) => ({type: GET_MESSAGE_LIST_SUCCESS, payload: messages});
export const fetchMessageListRequest = () => ({type: FETCH_MESSAGE_LIST_REQUEST});
export const fetchMessageListSuccess = (messages) => ({type: FETCH_MESSAGE_LIST_SUCCESS, payload: messages});
export const getMessageRequest = () => ({type: GET_MESSAGE_REQUEST});
export const getMessageSuccess = (message) => ({type: GET_MESSAGE_SUCCESS, payload: message});
export const deleteMessageRequest = () => ({type: DELETE_MESSAGE_REQUEST});
export const deleteMessageSuccess = (message) => ({type: DELETE_MESSAGE_SUCCESS, payload: message});
export const downloadAttachmentRequest = () => ({type: DOWNLOAD_ATTACHMENT_REQUEST});
export const downloadAttachmentSuccess = () => ({type: DOWNLOAD_ATTACHMENT_SUCCESS});
export const sendMessageRequest = () => ({type: SEND_MESSAGE_REQUEST});
export const sendMessageSuccess = () => ({type: SEND_MESSAGE_SUCCESS});