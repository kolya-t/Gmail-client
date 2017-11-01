/* global gapi */
import {getMessageRequest, getMessageSuccess} from '../constants'
import {getBody} from "../messageMethods";

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
        body: getBody(result)
      }
    }));
  })
};