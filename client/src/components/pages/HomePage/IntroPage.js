import React, { Component } from "react";
import introPage from "./intoPage.png";
import introText from "./introText.png";
import Templates from "./Templates";
import { Image } from "semantic-ui-react";

import { connect } from "react-redux";
import * as actions from "../../../actions";

class IntroPage extends Component {
  render() {
    return (
      <>
        <div className="introPageMainDiv d-flex justify-content-center align-items-center ">
          <div className="introPageDiv d-flex justify-content-center align-items-center mrgTop-30vh ">
            <Image
              className="w-75"
              src={introText}
              alt="itro page survey image"
            />
          </div>
          <div className="introPageDiv mrgTop-20vh d-flex justify-content-center align-items-center ">
            <Image
              className="w-75"
              src={introPage}
              alt="itro page survey image"
            />
          </div>
        </div>
        <Templates />
      </>
    );
  }
}

export default connect(
  null,
  // selectSong is the actionCreater we imported
  actions
)(IntroPage);
