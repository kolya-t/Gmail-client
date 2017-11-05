/* global gapi */
import {getSentRequest, getSentSuccess} from '../constants'
import {getHeader} from '../messageMethods'

export const getSent = (pageToken) => dispatch => {
  dispatch(getSentRequest());
  gapi.client.gmail.users.messages.list({
    userId: 'me',
    labelIds: 'SENT',
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
      dispatch(getSentSuccess({
        messages,
        currentPageToken: pageToken,
        nextPageToken: response.nextPageToken
      }));
    })
  })
};