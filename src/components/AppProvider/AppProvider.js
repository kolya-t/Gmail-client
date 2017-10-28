import React from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

import {Application} from '../Application'
import history from '../../history'
import store from '../../store'

const AppProvider = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application/>
    </ConnectedRouter>
  </Provider>
);

export default AppProvider;