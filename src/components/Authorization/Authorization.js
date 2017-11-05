import React from 'react'
import {connect} from 'react-redux'
import {Button, Col} from 'react-bootstrap'

import {authorize} from '../../actions/authActionCreators'
import './index.css'

const Authorization = (props) => (
  <div className='container outer'>
    <div className='middle'>
      <Col smOffset={4} sm={4} lgOffset={5} lg={2}>
        <div className='inner'>
          <Button
            onClick={props.authorize}
            className='btn-block btn-lg btn-social btn-google'
          >
            <i className='fa fa-google'/>
            Sign in with Google
          </Button>
        </div>
      </Col>
    </div>
  </div>
);

export default connect(
  null,
  dispatch => ({
    authorize: () => {
      dispatch(authorize())
    }
  })
)(Authorization);