import React from 'react'
import {ListGroupItem, Row, Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';

import {getHeader} from '../../messageMethods'

export default ({message}) => (
  <LinkContainer to={`/messages/${message.id}`}>
    <ListGroupItem>
      <Row>
        <Col sm={3}>
          {getHeader(message, 'From')}
        </Col>
        <Col sm={8}>
          <b>{getHeader(message, 'Subject')}</b> - {message.snippet}
        </Col>
        <Col sm={1}>
          <i>
            <Moment locale={'ru'} fromNow date={getHeader(message, 'Date')}/>
          </i>
        </Col>
      </Row>
    </ListGroupItem>
  </LinkContainer>
);