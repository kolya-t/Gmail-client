import React, {Component} from 'react'
import {ListGroup} from 'react-bootstrap'

import {MessageRow} from "../../MessageRow";

class MessageListPage extends Component {

  componentWillMount() {
    this.props.getMessages();
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

export default MessageListPage;