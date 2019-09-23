import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import googleIcon from "./search.png";
import Payments from "./reusable/Payments";
import { Button, Image, Icon, Label, Popup } from "semantic-ui-react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
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
  state = { enoughCredits: false };

  toggle = () => {
    if (this.props.bodyClicked === true) {
      this.props.bodyClickedFalsed();
    } else {
      this.props.bodyClickedTrue();
    }
  };

  toggleCreditsModal = () => {
    this.setState(prevState => ({
      enoughCredits: !prevState.enoughCredits
    }));
  };

  creditsChecking = () => {
    console.log("NICE", this.props.auth.credits);
    if (this.props.auth.credits < 1) {
      this.setState({ enoughCredits: true });
    } else {
      this.props.history.push("/surveys/new");
    }
  };

  CreateNewSurveyRender = () => {
    return (
      <div>
        <Button
          className="addCreditsLink"
          color="teal"
          animated
          onClick={this.creditsChecking}
        >
          <Button.Content visible>Create Survey</Button.Content>
          <Button.Content hidden>
            <Icon className="mb-3" color="white" name="add" />
            New Survey
          </Button.Content>
        </Button>
      </div>
    );
  };

  navBarRender = () => {
    if (this.props.auth) {
      return (
        <>
          <NavItem m-2>
            <Payments className="mt-2" />
          </NavItem>
          <NavItem>
            <NavLink disabled>
              <Button className="">
                Credits:{" "}
                <span className="text-primary">{this.props.auth.credits}</span>
              </Button>
            </NavLink>
          </NavItem>
          <NavItem className=" curser-pointer">
            <NavLink className="p-0">{this.CreateNewSurveyRender()}</NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar className="pr-3">
            <DropdownToggle
              nav
              caret
              className="d-flex flex-row align-items-center p-0"
            >
              <NavItem>
                <NavLink className="d-flex">
                  <Image
                    className="ml-3 profileImage rounded-circle"
                    src={this.props.auth.profilePicture}
                    alt="logo image"
                  />
                </NavLink>
              </NavItem>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Label
                  className="d-flex border-0 noTextDecoration"
                  href={"/api/logout"}
                >
                  Logout
                </Label>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    } else if (this.props.auth === false) {
      return (
        <NavItem>
          <Popup
            trigger={
              <Button href={"/auth/google"} id="loginTooltip">
                <Image
                  className="googleIcon d-inline"
                  src={googleIcon}
                  alt="Google Icon"
                />
                Login
              </Button>
            }
            content="With Google authentication We only have access to your full name and profile picture."
            basic
          />
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
    return (
      <div className=" headerDiv bg-white fixed-top">
        <Navbar light expand="md">
          {this.onClickLogoRender()}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.props.bodyClicked} navbar>
            <Nav className="ml-auto d-flex align-itm-header" navbar>
              {this.navBarRender()}
            </Nav>
          </Collapse>
        </Navbar>
        <div>
          <Modal
            isOpen={this.state.enoughCredits}
            toggle={this.toggleCreditsModal}
            className={this.props.className}
          >
            <ModalHeader
              className="text-danger"
              toggle={this.toggleCreditsModal}
            >
              Please Add Credits
            </ModalHeader>
            <ModalBody>
              Your account credits is not sufficient, please add credits before
              proceeding to create new survey.
            </ModalBody>
            <ModalFooter>
              <Payments />
              <Button onClick={this.toggleCreditsModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

// state is the state in redux.
const mapStateToProps = state => {
  return {
    auth: state.auth,
    bodyClicked: state.bodyClicked
  }; // this object is what is passed as props into SongList components
};

export default connect(
  mapStateToProps,
  actions
)(Header);
