import React from 'react'
import {connect} from 'react-redux'

import {getSent} from '../../../actions/sentActionCreators'
import {MessageListPage} from '../MessageListPage'

const SentPage = (props) => (
  <MessageListPage
    getMessages={props.getSent}
    isLoading={props.isLoading}
    messages={props.messages}
  />
);

export default connect(
  state => ({
    messages: state.sent.messages,
    isLoading: state.sent.isLoading,
  }),
  dispatch => ({
    getSent: () => {
      dispatch(getSent())
    },
  })
)(SentPage);