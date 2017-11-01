import React from 'react'
import {Redirect, Route, Switch} from 'react-router'

import {InboxPage} from '../pages/InboxPage'
import {MessagePage} from '../pages/MessagePage'

export default () => (
  <div className='container'>
    <Switch>
      <Route exact path='/inbox' component={InboxPage}/>
      <Route exact path='/messages/:id' component={MessagePage}/>
      <Route path='/' render={() => <Redirect to='/inbox'/>}/>
    </Switch>
  </div>
);