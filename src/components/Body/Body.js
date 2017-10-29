import React from 'react'
import {Redirect, Route, Switch} from 'react-router'

import {InboxPage} from '../pages/InboxPage'

export default () => (
  <div className='container'>
    <Switch>
      <Route exact path='/inbox' component={InboxPage}/>
      <Route path='/' render={() => <Redirect to='/inbox'/>}/>
    </Switch>
  </div>
);