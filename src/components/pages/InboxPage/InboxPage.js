import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroup} from 'react-bootstrap'

import {getInbox} from '../../../actions/inboxActionCreators'
import {Loading} from '../../Loading'
import {MessageRow} from "../../MessageRow";

class InboxPage extends Component {

  componentWillMount() {
    this.props.getInbox();
  }

  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <Loading/>
        ) : (
          <ListGroup>
            {this.props.messages.map(message => (
              <MessageRow
                key={message.id}
                message={message}
              />
            ))}
          </ListGroup>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    messages: state.inbox.messages,
    isLoading: state.inbox.isLoading
  }),
  dispatch => ({
    getInbox: () => {
      dispatch(getInbox())
    }
  })
)(InboxPage);