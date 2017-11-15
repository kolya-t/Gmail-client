import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'

import {loadGapi} from '../../actions/gapiLoadingActionCreators'
import {Authorization} from "../Authorization";
import {Router} from '../Router'
import LoadingBar from 'react-redux-loading-bar'
import './loadingBar.css'

class Application extends Component {

  componentWillMount() {
    this.props.loadGapi();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Gmail</title>
        </Helmet>
        <LoadingBar className='loading'/>
        {this.props.isGapiLoaded &&
        <div>
          {this.props.isAuthenticated ?
            <Router/> : <Authorization/>
          }
        </div>
        }
      </div>
    )
  }
}

Application.propTypes = {
  isGapiLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadGapi: PropTypes.func.isRequired
};

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