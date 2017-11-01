/* global gapi */
import {getInboxRequest, getInboxSuccess} from '../constants'
import {getHeader} from '../messageMethods'

export const getPreviousInbox = () => (dispatch, getState) => {
  dispatch(getInbox(getState().inbox.previousPageToken))
};

export const getNextInbox = () => (dispatch, getState) => {
  dispatch(getInbox(getState().inbox.nextPageToken))
};

export const getInbox = (pageToken) => dispatch => {
  dispatch(getInboxRequest());
  gapi.client.gmail.users.messages.list({
    userId: 'me',
    labelIds: 'INBOX',
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
      dispatch(getInboxSuccess({
        messages,
        currentPageToken: pageToken,
        nextPageToken: response.nextPageToken
      }));
    })
  })
};