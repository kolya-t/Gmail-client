/* global gapi */
import {
  deleteMessageRequest,
  deleteMessageSuccess,
  fetchMessageListRequest,
  fetchMessageListSuccess,
  getMessageListRequest,
  getMessageListSuccess
} from '../constants'
import {getHeader} from '../messageMethods'

export const deleteMessage = (message) => dispatch => {
  dispatch(deleteMessageRequest());

  gapi.client.gmail.users.messages.modify({
    userId: 'me',
    id: message.id,
    resource: {
      addLabelIds: ['TRASH'],
      removeLabelIds: []
    }
  }).execute(result => {
    dispatch(deleteMessageSuccess(message));
  });
};

const receiveMessageList = (messageListName, pageToken, onRequest, onSuccess) => dispatch => {
  dispatch(onRequest());
  gapi.client.gmail.users.messages.list({
    userId: 'me',
    labelIds: messageListName,
    maxResults: 20,
    pageToken: pageToken
  }).execute(response => {
    let promise = new Promise((resolve, reject) => {
      let messages = [];
      let counter = response.messages.length;
      response.messages.forEach(message => {
        gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: message.id
        }).then(({result}) => {
          messages.push({
            id: result.id,
            snippet: result.snippet,
            isUnread: result.labelIds.includes('UNREAD'),
            payload: {
              headers: result.payload.headers
            }
          });
          if (--counter === 0) {
            resolve(messages);
          }
        }).catch(e => {
          reject(e);
        })
      });
    });

    promise.then(messages => {
      messages.sort((a, b) => new Date(getHeader(b, 'Date')) - new Date(getHeader(a, 'Date')));
      dispatch(onSuccess({
        messages,
        nextPageToken: response.nextPageToken
      }));
    })
  })
};

export const getMessageList = (messageListName) => dispatch => {
  dispatch(receiveMessageList(
    messageListName,
    '',
    getMessageListRequest,
    getMessageListSuccess
  ))
};

export const fetchMessageList = (messageListName) => (dispatch, getState) => {
  dispatch(receiveMessageList(
    messageListName,
    getState().messages.nextPageToken,
    fetchMessageListRequest,
    fetchMessageListSuccess
  ));
};