import React, {Component} from 'react'
import {ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux'

import {getMessageList} from '../../../actions/messageListActionCreators'
import {MessageRow} from "../../MessageRow";

class MessageListPage extends Component {

  componentWillMount() {
    this.props.getMessages(this.props.listName);
  }

  render() {
    return (
      <div>
        {!this.props.isLoading ? (
          <div>
            <ListGroup>
              {this.props.messages.map(message => (
                <MessageRow
                  key={message.id}
                  message={message}
                />
              ))}
            </ListGroup>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  state => ({
    messages: state.messages.messages,
    isLoading: state.messages.isLoading
  }),
  dispatch => ({
    getMessages: (listName) => {
      dispatch(getMessageList(listName))
    }
  })
)(MessageListPage);