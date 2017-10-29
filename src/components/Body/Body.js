import React from 'react'
import {Route, Switch} from 'react-router'

import {IndexPage} from '../pages/IndexPage'

const Body = () => (
  <div className='container'>
    <Switch>
      <Route exact path='/' component={IndexPage}/>
    </Switch>
  </div>
);

export default Body;