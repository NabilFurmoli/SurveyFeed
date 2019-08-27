import React, { Component } from "react";
import introPage from "./intoPage.png";
import introText from "./introText.png";
import { Image } from "semantic-ui-react";

class IntroPage extends Component {
  render() {
    return (
      <div className="introPageMainDiv d-flex justify-content-center align-items-center ">
        <div className="introPageDiv d-flex justify-content-center align-items-center mrgTop-20vh ">
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
    );
  }
}

export default IntroPage;
