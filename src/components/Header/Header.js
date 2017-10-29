import React from 'react'
import {connect} from 'react-redux'
import {Button, Navbar} from 'react-bootstrap'
import {unauthorize} from '../../actions/authActionCreators'

const Header = (props) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Gmail клиент</a>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullRight>
        <Button onClick={props.unauthorize}>Выйти</Button>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

export default connect(
  null,
  dispatch => ({
    unauthorize: () => {
      dispatch(unauthorize())
    }
  })
)(Header);