import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from './../../actions';
import SurveyList from "./SurveyList";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Dashboard extends Component {

    constructor (props) {
      super(props);

      this.props.fetchSurveys();
    }
  
  render() {
    return (
      <div className="d-flex flex-column mt-5"> 
        <SurveyList />
        <div className="mt-5 mb-5">
          <Link to="/surveys/new">
            <Button
              color="teal"
              content="Create New Survey"
              icon="add"
              labelPosition="right"
              floated="right"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions // selectSong is the actionCreater we imported
)(Dashboard);

