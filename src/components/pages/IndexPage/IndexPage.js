import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authorize} from '../../../actions/authActionCreators'

class IndexPage extends Component {

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <p>TODO: Redirect to inbox page</p>
        ) : (
          <button onClick={this.props.authorize}>
            Войти
          </button>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  dispatch => ({
    authorize: () => {
      dispatch(authorize())
    }
  })
)(IndexPage);