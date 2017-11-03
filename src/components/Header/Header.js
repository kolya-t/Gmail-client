import React from 'react'
import {connect} from 'react-redux'
import {Button, Nav, Navbar, NavItem} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'
import {unauthorize} from '../../actions/authActionCreators'

const Header = (props) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <IndexLinkContainer to='/'>
          <a><i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i></a>
        </IndexLinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to='/inbox'>
          <NavItem>Входящие</NavItem>
        </LinkContainer>
        <LinkContainer to='/send'>
          <NavItem>Написать</NavItem>
        </LinkContainer>
      </Nav>
      <Navbar.Form pullRight>
        <Button onClick={props.unauthorize}>
          <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </Button>
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