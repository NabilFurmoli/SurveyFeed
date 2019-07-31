
import React from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
   } from 'reactstrap';
  
  class Header extends React.Component {

    state = {isOpen: false};
   
    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    LogStatusRender = () => {
        if (this.props.auth) {
            return (
              <NavLink href={'/api/logout'}>Logout</NavLink>
            );
            
        } else if (this.props.auth === false) {
            return (
              <NavLink href={'/auth/google'}>Login</NavLink>
            );
        }
    }

    render() {
      return (
        <div>
          <Navbar  light expand="md">
            <NavbarBrand href="/index.html">SurveyFeed</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink >Emails</NavLink>
                </NavItem>
                <NavItem>
                  {this.LogStatusRender()}
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }


// state is the state in redux.
const mapStateToProps = state => {
    return { auth: state.auth }; // this object is what is passed as props into SongList components
  };
  
export default connect(
    mapStateToProps
)(Header);
  