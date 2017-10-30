import React from 'react'
import {connect} from 'react-redux'
import {Button, Navbar, Nav, NavItem} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'
import {unauthorize} from '../../actions/authActionCreators'

const Header = (props) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <IndexLinkContainer to='/'>
          <a>Gmail клиент</a>
        </IndexLinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to='/inbox'>
          <NavItem>Входящие</NavItem>
        </LinkContainer>
      </Nav>
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