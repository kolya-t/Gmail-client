import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col, ListGroupItem, Row} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';
import renderHtml from 'react-render-html'

import {deleteMessage} from '../../actions/messageListActionCreators'
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import './react-contextmenu.css'

import {getHeader} from '../../messageMethods'

class MessageRow extends Component {

  onDeleteClick = () => {
    this.props.deleteMessage(this.props.message);
  };

  render() {
    const {message} = this.props;

    return (
      <LinkContainer to={`/messages/${message.id}`}>
        <ListGroupItem
          id={'row-' + message.id}
          bsStyle={message.isUnread ? 'warning' : null}
        >
          <ContextMenuTrigger id={message.id}>
            <Row>
              <Col sm={3}>
                {getHeader(message, 'From')}
              </Col>
              <Col sm={8}>
                <b>{getHeader(message, 'Subject')}</b> - {renderHtml(message.snippet)}
              </Col>
              <Col sm={1}>
                <i>
                  <Moment locale={'ru'} fromNow date={getHeader(message, 'Date')}/>
                </i>
              </Col>
            </Row>
          </ContextMenuTrigger>

          <ContextMenu id={message.id}>
            <MenuItem onClick={this.onDeleteClick}>Удалить</MenuItem>
          </ContextMenu>
        </ListGroupItem>
      </LinkContainer>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    deleteMessage: (message) => {
      dispatch(deleteMessage(message))
    }
  })
)(MessageRow);