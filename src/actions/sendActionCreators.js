/* global gapi */
import {sendMessageRequest, sendMessageSuccess} from '../constants'

export const sendMessage = (to, subject, message) => dispatch => {
  dispatch(sendMessageRequest());
  const headers = {
    'To': to,
    'Subject': subject
  };

  let email = '';
  for (let h in headers) {
    email += h += `: ${headers[h]}\r\n`
  }
  email += `\r\n${message}`;

  gapi.client.gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_')
    }
  }).then((response) => {
    dispatch(sendMessageSuccess())
  })
};