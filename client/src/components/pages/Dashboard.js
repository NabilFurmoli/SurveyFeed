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
      <div onClick={this.props.bodyClickedFalsed} className="flex-fill d-flex flex-column mrgTop-20vh">
        <SurveyList />
        
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
