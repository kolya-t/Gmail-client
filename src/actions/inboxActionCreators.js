/* global gapi */
import {getInboxRequest, getInboxSuccess} from '../constants'

export const getInbox = () => dispatch => {
  dispatch(getInboxRequest());
  gapi.client.gmail.users.messages.list({
    userId: 'me',
    labelIds: 'INBOX',
    maxResults: 10
  }).execute(response => {
    let promise = new Promise((resolve, reject) => {
      let messages = [];
      let counter = response.messages.length;
      response.messages.forEach(message => {
        gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: message.id
        }).then(({result}) => {
          messages.push(result);
          if (--counter === 0) {
            resolve(messages);
          }
        }).catch(e => {
          reject(e);
        })
      });
    });

    promise.then(messages => {
      dispatch(getInboxSuccess(messages));
    })
  })
};