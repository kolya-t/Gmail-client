import React from 'react'
import {connect} from 'react-redux'
import {Button, Nav, Navbar, NavItem} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'
import PropTypes from 'prop-types'

import {unauthorize} from '../../actions/authActionCreators'

const Header = (props) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <IndexLinkContainer to='/'>
          <a><i className="fa fa-envelope-o fa-lg"/></a>
        </IndexLinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to='/inbox'>
          <NavItem>Входящие</NavItem>
        </LinkContainer>
        <LinkContainer to='/sent'>
          <NavItem>Отправленные</NavItem>
        </LinkContainer>
        <LinkContainer to='/send'>
          <NavItem>Написать</NavItem>
        </LinkContainer>
      </Nav>
      <Navbar.Form pullRight>
        <Button onClick={props.unauthorize}>
          <i className="fa fa-sign-out fa-lg"/>
        </Button>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  unauthorize: PropTypes.func.isRequired
};

export default connect(
  undefined,
  dispatch => ({
    unauthorize: () => {
      dispatch(unauthorize())
    }
  })
)(Header);