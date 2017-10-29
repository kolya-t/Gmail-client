import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getInbox} from '../../../actions/inboxActionCreators'
import {Loading} from '../../Loading'

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
          <ul>
            {this.props.messages.map(message => (
              <li key={message.id}>{message.snippet}</li>
            ))}
          </ul>
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