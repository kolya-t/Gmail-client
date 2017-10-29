import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import history from './history'
import reducers from './reducers/index'

export default createStore(
  reducers,
  undefined,
  composeWithDevTools(
    applyMiddleware(thunk, routerMiddleware(history))
  )
);