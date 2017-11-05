export const GAPI_LOAD_REQUEST = 'GAPI_LOAD_REQUEST';
export const GAPI_LOAD_SUCCESS = 'GAPI_LOAD_SUCCESS';
export const AUTHORIZED = 'AUTHORIZED';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const GET_INBOX_REQUEST = 'GET_INBOX_REQUEST';
export const GET_INBOX_SUCCESS = 'GET_INBOX_SUCCESS';
export const GET_SENT_REQUEST = 'GET_SENT_REQUEST';
export const GET_SENT_SUCCESS = 'GET_SENT_SUCCESS';
export const GET_MESSAGE_REQUEST = 'GET_MESSAGE_REQUEST';
export const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS';
export const DOWNLOAD_ATTACHMENT_REQUEST = 'DOWNLOAD_ATTACHMENT_REQUEST';
export const DOWNLOAD_ATTACHMENT_SUCCESS = 'DOWNLOAD_ATTACHMENT_SUCCESS';
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

export const gapiLoadRequest = () => ({type: GAPI_LOAD_REQUEST});
export const gapiLoadSuccess = () => ({type: GAPI_LOAD_SUCCESS});

export const authorized = () => ({type: AUTHORIZED});
export const unauthorized = () => ({type: UNAUTHORIZED});

export const getInboxRequest = () => ({type: GET_INBOX_REQUEST});
export const getInboxSuccess = (inbox) => ({type: GET_INBOX_SUCCESS, payload: inbox});
export const getSentRequest = () => ({type: GET_SENT_REQUEST});
export const getSentSuccess = (sent) => ({type: GET_SENT_SUCCESS, payload: sent});
export const getMessageRequest = () => ({type: GET_MESSAGE_REQUEST});
export const getMessageSuccess = (message) => ({type: GET_MESSAGE_SUCCESS, payload: message});
export const downloadAttachmentRequest = () => ({type: DOWNLOAD_ATTACHMENT_REQUEST});
export const downloadAttachmentSuccess = () => ({type: DOWNLOAD_ATTACHMENT_SUCCESS});
export const sendMessageRequest = () => ({type: SEND_MESSAGE_REQUEST});
export const sendMessageSuccess = () => ({type: SEND_MESSAGE_SUCCESS});