import React, {Component} from 'react'
import {ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-spinkit'

import {getMessageList, fetchMessageList} from '../../../actions/messageListActionCreators'
import {MessageRow} from "../../MessageRow";

class MessageListPage extends Component {

  componentWillMount() {
    this.props.getMessages(this.props.listName);
  }

  loadMore() {
    if (!this.props.isLoading) {
      this.props.fetchMessages(this.props.listName);
    }
  }

  render() {
    return (
      <div>
        <InfiniteScroll
          initialLoad={false}
          loadMore={this.loadMore.bind(this)}
          hasMore={this.props.hasNext}
          loader={<Spinner name="ball-pulse-sync" color="steelblue" className='text-center'/>}
        >
          <ListGroup>
            {this.props.messages.map(message => (
              <MessageRow
                key={message.id}
                message={message}
              />
            ))}
          </ListGroup>
        </InfiniteScroll>
      </div>
    );
  }
}

export default connect(
  state => ({
    messages: state.messages.messages,
    isLoading: state.messages.isLoading,
    hasNext: typeof state.messages.nextPageToken !== 'undefined'
  }),
  dispatch => ({
    getMessages: (listName) => {
      dispatch(getMessageList(listName))
    },
    fetchMessages: (listName) => {
      dispatch(fetchMessageList(listName))
    }
  })
)(MessageListPage);