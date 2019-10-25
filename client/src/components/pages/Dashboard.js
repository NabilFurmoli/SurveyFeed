import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import SurveyList from "./SurveyList";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.props.fetchSurveys();
  }

  render() {
    return (
      <div className="flex-fill d-flex flex-column mrgTop-20vh">
        <SurveyList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
