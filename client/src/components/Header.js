
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './reusable/Payments';
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

    navBarRender = () => {
        if (this.props.auth) {
            return (
              <>
                <NavItem>
                  <Payments/>
                </NavItem> 
                <NavItem>
                  <NavLink >Credits: {this.props.auth.credits}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href={'/api/logout'}>Logout</NavLink>
                </NavItem>
              </>
            );
            
        } else if (this.props.auth === false) {
            return (
              <NavItem>
                 <NavLink href={'/auth/google'}>Login</NavLink>
              </NavItem> 
            );
        } 
    }

    onClickLogoRender = () => {
      if (this.props.auth) {
        return (
          <Link to="/surveys">
              <NavbarBrand>SurveyFeed</NavbarBrand>
          </Link>
        );
        
      } else if (this.props.auth === false) {
        return (
          <Link to="/">
              <NavbarBrand >SurveyFeed</NavbarBrand>
          </Link>
        );
      }
    }

    render() {
      //console.log(this.props);
      return (
        <div>
          <Navbar  light expand="md">
            {this.onClickLogoRender()}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.navBarRender()}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }


// state is the state in redux.
const mapStateToProps = state => {
    return { auth: state.auth}; // this object is what is passed as props into SongList components
  };
  
export default connect(
    mapStateToProps
)(Header);
  