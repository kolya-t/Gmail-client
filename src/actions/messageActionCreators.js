/* global gapi */
import {getMessageRequest, getMessageSuccess} from '../constants'
import {getHtmlBody, getAttachments} from "../messageMethods";

export const getMessage = (id) => dispatch => {
  dispatch(getMessageRequest());
  gapi.client.gmail.users.messages.get({
    userId: 'me',
    id
  }).then(({result}) => {
    dispatch(getMessageSuccess({
      id: result.id,
      payload: {
        headers: result.payload.headers,
        htmlBody: getHtmlBody(result),
        attachments: getAttachments(result)
      }
    }));
  })
};