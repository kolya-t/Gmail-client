import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {loadingBarReducer} from 'react-redux-loading-bar'

import gapi from './gapiLoadReducer'
import auth from './authorizeReducer'
import messages from './messageListReducer'
import message from './messageReducer'
import send from './sendReducer'

export default combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  gapi,
  auth,
  messages,
  message,
  send
});