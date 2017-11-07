import React from 'react'
import {Helmet} from 'react-helmet'

import {MessageListPage} from '../MessageListPage'

const InboxPage = () => (
  <div>
    <Helmet>
      <title>Входящие - Gmail</title>
    </Helmet>
    <MessageListPage listName='INBOX'/>
  </div>
);

export default InboxPage;