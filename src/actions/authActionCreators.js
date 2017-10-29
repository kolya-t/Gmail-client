/* global gapi */
import {authorizeSuccess, gapiLoadSuccess, unauthorized} from '../constants'

export const loadGapi = () => dispatch => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
      clientId: '716950246214-d1cddjfk2f2lhh7h2sshr1pbm10v2jkd.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then(() => {
      dispatch(gapiLoadSuccess());
      gapi.auth2.getAuthInstance().isSignedIn.listen((status) => dispatch(updateSigninStatus(status)));
      dispatch(updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()));
    });
  });
};

export const authorize = () => dispatch => {
  gapi.auth2.getAuthInstance().signIn();
};

export const unauthorize = () => dispatch => {
  gapi.auth2.getAuthInstance().signOut();
};

const updateSigninStatus = (isSignedIn) => dispatch => {
  if (isSignedIn) {
    dispatch(authorizeSuccess());
  } else {
    dispatch(unauthorized());
  }
};