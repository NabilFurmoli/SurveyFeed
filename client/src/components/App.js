import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Dashboard from "./Dashboard";
import IntroPage from "./reusable/IntroPage";
import CreateSurvey from "./CreateSurvey";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }

  render() {
    return (
      <div className=" height-100 container">
        <BrowserRouter>
          <div className=" height-100 d-flex flex-column">
            <Route path="/" component={Header} />
            {(() => {
              if (this.props.auth) {
                return <Route exact path="/" component={Dashboard} />;
              } else {
                return <Route exact path="/" component={IntroPage} />;
              }
            })()}

            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={CreateSurvey} />
          </div>
        </BrowserRouter>
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
)(App);
