/* global gapi */
import {getMessageListRequest, getMessageListSuccess} from '../constants'
import {getHeader} from '../messageMethods'

export const getMessageList = (messageListName, pageToken) => dispatch => {
  dispatch(getMessageListRequest());
  gapi.client.gmail.users.messages.list({
    userId: 'me',
    labelIds: messageListName,
    maxResults: 10,
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
      dispatch(getMessageListSuccess({
        messages,
        currentPageToken: pageToken,
        nextPageToken: response.nextPageToken
      }));
    })
  })
};