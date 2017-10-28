import React from 'react';
import ReactDOM from 'react-dom';

// import App from './App'
import {AppProvider} from './components/AppProvider';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

ReactDOM.render(
  <AppProvider/>,
  document.getElementById('root')
);
registerServiceWorker();
