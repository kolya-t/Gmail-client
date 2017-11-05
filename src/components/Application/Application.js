import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loadGapi} from '../../actions/gapiLoadingActionCreators'
import {Header} from '../Header'
import {Authorization} from "../Authorization";
import {Body} from '../Body'
import {ConnectedRouter} from 'react-router-redux'
import history from '../../history'
import LoadingBar from 'react-redux-loading-bar'
import './loadingBar.css'

class Application extends Component {

  componentWillMount() {
    this.props.loadGapi();
  }

  render() {
    return (
      <div>
        <LoadingBar className='loading'/>
        {this.props.isGapiLoaded ? (
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
        ) : null}
      </div>
    )
  }
}

export default connect(
  state => ({
    isGapiLoaded: state.gapi.isGapiLoaded,
    isAuthenticated: state.auth.isAuthenticated
  }),
  dispatch => ({
    loadGapi: () => {
      dispatch(loadGapi())
    }
  })
)(Application);