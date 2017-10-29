import React from 'react';
import ReactDOM from 'react-dom';

import {AppProvider} from './components/AppProvider';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

ReactDOM.render(
  <AppProvider/>,
  document.getElementById('root')
);
registerServiceWorker();
