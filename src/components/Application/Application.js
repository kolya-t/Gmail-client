import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loadGapi} from '../../actions/authActionCreators'
import {Loading} from "../Loading";
import {Header} from '../Header'
import {Authorization} from "../Authorization";
import {Body} from '../Body'
import {ConnectedRouter} from 'react-router-redux'
import history from '../../history'

class Application extends Component {

  componentWillMount() {
    window.handleGoogleClientLoad = this.props.loadGapi();
  }

  render() {
    return (
      <div>
        {!this.props.isGapiLoaded ? (
          <Loading/>
        ) : (
          <div>
            {!this.props.isAuthenticated ? (
              <Authorization/>
            ) : (
              <ConnectedRouter history={history}>
                <div>
                  <Header/>
                  <Body/>
                </div>
              </ConnectedRouter>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    isGapiLoaded: state.auth.isGapiLoaded,
    isAuthenticated: state.auth.isAuthenticated
  }),
  dispatch => ({
    loadGapi: () => {
      dispatch(loadGapi())
    }
  })
)(Application);