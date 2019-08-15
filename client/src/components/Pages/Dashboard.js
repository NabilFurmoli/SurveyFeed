import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "./../../actions";
import SurveyList from "./SurveyList";
import { Button } from "semantic-ui-react";
import Payments from '../reusable/Payments'

class Dashboard extends Component {
  state = { modal: false };
  constructor(props) {
    super(props);

    this.props.fetchSurveys();
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  creditsChecking = () => {
    console.log("NICE", this.props.auth.credits);
    if (this.props.auth.credits < 1) {
      this.setState({ modal: true });
    } else {
      this.props.history.push("/surveys/new");
    }
  };

  CreateNewSurveyRender = () => {
    return (
      <div className="mt-5 mb-5">
        <Button
          color="teal"
          content="Create New Survey"
          icon="add"
          labelPosition="right"
          floated="right"
          onClick={this.creditsChecking}
        />
      </div>
    );
  };

  render() {
    console.log("props", this.props);
    return (
      <div className="flex-fill d-flex flex-column justify-content-between mt-5">
        <SurveyList />

        {this.CreateNewSurveyRender()}

        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Please Add Credits</ModalHeader>
            <ModalBody>
              Your account credits is not sufficient, please add credits before proceeding to create new survey.
            </ModalBody>
            <ModalFooter>
              <Payments/>
              <Button onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }; // this object is what is passed as props into SongList components
};

export default connect(
  mapStateToProps,
  actions // selectSong is the actionCreater we imported
)(Dashboard);

// <div className="mt-5 mb-5">
// <Link to="/surveys/new">
//   <Button
//     color="teal"
//     content="Create New Survey"
//     icon="add"
//     labelPosition="right"
//     floated="right"
//     onClick={this.creditsChecking}
//   />
// </Link>
// </div>
