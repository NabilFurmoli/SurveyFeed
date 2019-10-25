import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Dashboard from "./pages/Dashboard";
import IntroPage from "./pages/HomePage/IntroPage";
import CreateSurvey from "./pages/surveys/CreateSurvey";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }

  render() {
    return (
      <div className=" height-100 container">
        <BrowserRouter>
          <Route path="/" component={Header} />
          <div
            onClick={this.props.bodyClickedFalsed}
            className=" height-100 d-flex flex-column"
          >
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
  // this object is what is passed as props into SongList components
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(App);
