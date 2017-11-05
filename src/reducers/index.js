import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {loadingBarReducer} from 'react-redux-loading-bar'

import gapi from './gapiLoadReducer'
import auth from './authorizeReducer'
import inbox from './inboxReducer'
import message from './messageReducer'
import send from './sendReducer'
import sent from './sentReducer'

export default combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  gapi,
  auth,
  inbox,
  message,
  send,
  sent
});