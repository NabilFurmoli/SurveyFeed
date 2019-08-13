import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./reusable/Payments";
import { Button, Image } from "semantic-ui-react";
import logo from "./SurveyFeed-Logo.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class Header extends React.Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  navBarRender = () => {
    if (this.props.auth) {
      return (
        <>
          <NavItem>
            <Payments />
          </NavItem>
          <NavItem>
            <Button>
              Credits: <span className="">{this.props.auth.credits}</span>
            </Button>
          </NavItem>
          <NavItem>
            <Button href={"/api/logout"}>Logout</Button>
          </NavItem>
        </>
      );
    } else if (this.props.auth === false) {
      return (
        <NavItem>
          <Button href={"/auth/google"}>Login</Button>
        </NavItem>
      );
    }
  };

  onClickLogoRender = () => {
    if (this.props.auth) {
      return (
        <Link to="/surveys" className=" logoDiv">
          <NavbarBrand className="w-100">
            <Image className="w-100" src={logo} alt="logo image" />
          </NavbarBrand>
        </Link>
      );
    } else if (this.props.auth === false) {
      return (
        <Link to="/" className=" logoDiv">
          <NavbarBrand>
            <Image className="w-100" src={logo} alt="logo image" />
          </NavbarBrand>
        </Link>
      );
    }
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <Navbar light expand="md">
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
  return { auth: state.auth }; // this object is what is passed as props into SongList components
};

export default connect(mapStateToProps)(Header);
