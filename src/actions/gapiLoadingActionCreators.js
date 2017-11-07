/* global gapi */
import {gapiLoadRequest, gapiLoadSuccess} from '../constants'
import {updateSigninStatus} from './authActionCreators'

export const loadGapi = () => dispatch => {
  dispatch(gapiLoadRequest());
  gapi.load('client:auth2', () => {
    gapi.client.init({
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
      clientId: '913025185621-6nbrr0f0v4u1n3eep4ft62n8tei9tt6o.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/gmail.readonly' +
            ' https://www.googleapis.com/auth/gmail.send' +
            ' https://www.googleapis.com/auth/gmail.modify'
    }).then(() => {
      dispatch(gapiLoadSuccess());
      gapi.auth2.getAuthInstance().isSignedIn.listen((status) => dispatch(updateSigninStatus(status)));
      dispatch(updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()));
    });
  });
};