import React from 'react'
import {Helmet} from 'react-helmet'

import {MessageListPage} from '../MessageListPage'

const SentPage = () => (
  <div>
    <Helmet>
      <title>Исходящие - Gmail</title>
    </Helmet>
    <MessageListPage listName='SENT'/>
  </div>
);

export default SentPage;