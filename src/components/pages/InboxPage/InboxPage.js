import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroup, Pager} from 'react-bootstrap'

import {getInbox, getNextInbox, getPreviousInbox} from '../../../actions/inboxActionCreators'
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
          <div>
            <ListGroup>
              {this.props.messages.map(message => (
                <MessageRow
                  key={message.id}
                  message={message}
                />
              ))}
            </ListGroup>
            <Pager>
              <Pager.Item
                previous
                disabled={!this.props.hasPrevious}
                onClick={this.props.getPreviousInbox}
              >&larr; К новым
              </Pager.Item>
              <Pager.Item
                next
                disabled={!this.props.hasNext}
                onClick={this.props.getNextInbox}
              >
                К старым &rarr;
              </Pager.Item>
            </Pager>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    messages: state.inbox.messages,
    isLoading: state.inbox.isLoading,
    hasNext: state.inbox.hasNext,
    hasPrevious: state.inbox.hasPrevious
  }),
  dispatch => ({
    getInbox: () => {
      dispatch(getInbox())
    },
    getPreviousInbox: () => {
      dispatch(getPreviousInbox())
    },
    getNextInbox: () => {
      dispatch(getNextInbox())
    }
  })
)(InboxPage);