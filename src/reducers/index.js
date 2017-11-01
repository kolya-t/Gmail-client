import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import auth from './authorizeReducer'
import inbox from './inboxReducer'
import message from './messageReducer'

export default combineReducers({
  router: routerReducer,
  auth,
  inbox,
  message
});