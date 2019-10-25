import React, { Component } from "react";

import { Image, Card, Icon, Label, Menu } from "semantic-ui-react";

class IntroPage extends Component {
  render() {
    return (
      <div className="templatesDiv ">
        <div className="row">
          <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center flex-column">
            <Icon className="users icon huge teal m-3" />
            <h3>Customer satisfaction</h3>
            <p className="text-center">
              Get real-time feedback to ensure your Customers' satisfaction{" "}
            </p>
          </div>
          <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center flex-column">
            <Icon className="paper plane icon huge teal m-3" />
            <h3>Event planning</h3>
            <p className="text-center">
              Set up Events and Gather feedback from attendies in real time
            </p>
          </div>
          <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center flex-column">
            <Icon className="university icon huge teal m-3" />
            <h3>Education and Schools</h3>
            <p className="text-center">
              Get feedbacks to improve lectures, processes, and academic
              achievement.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default IntroPage;
