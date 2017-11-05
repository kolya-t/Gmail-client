import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {routerMiddleware} from 'react-router-redux'
import {loadingBarMiddleware} from 'react-redux-loading-bar'
import thunk from 'redux-thunk'

import history from './history'
import reducers from './reducers/index'

const store = createStore(
  reducers,
  undefined,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
      })
    )
  )
);

export default store;