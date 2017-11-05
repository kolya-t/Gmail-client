/* global gapi */
import {authorized, unauthorized} from '../constants'

export const authorize = () => dispatch => {
  gapi.auth2.getAuthInstance().signIn();
};

export const unauthorize = () => dispatch => {
  gapi.auth2.getAuthInstance().signOut();
};

export const updateSigninStatus = (isSignedIn) => dispatch => {
  if (isSignedIn) {
    dispatch(authorized());
  } else {
    dispatch(unauthorized());
  }
};