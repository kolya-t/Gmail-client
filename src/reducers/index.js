import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import auth from './authorizeReducer'
import inbox from './inboxReducer'

export default combineReducers({
  router: routerReducer,
  auth,
  inbox
});