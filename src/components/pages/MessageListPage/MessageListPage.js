import React, {Component} from 'react'
import {ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'

import {fetchMessageList, getMessageList} from '../../../actions/messageListActionCreators'
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
    );
  }
}

MessageListPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  getMessages: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  listName: PropTypes.string.isRequired
};

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