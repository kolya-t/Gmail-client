import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import auth from './authorizeReducer'

export default combineReducers({
  router: routerReducer,
  auth
});