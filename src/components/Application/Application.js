import React, {Component} from 'react'
import {Route, Switch} from 'react-router'

import {IndexPage} from '../pages/IndexPage'
import {connect} from 'react-redux'
import {loadGapi} from '../../actions/authActionCreators'
import {Loading} from "../Loading";

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
            <div className='container'>
              <Switch>
                <Route exact path='/' component={IndexPage}/>
              </Switch>
            </div>
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