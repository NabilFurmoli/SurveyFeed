import React, { Component } from "react";
import { connect } from "react-redux";
import emptySurveysPicture from "../emptySurveys.png";
import { Image, Card, Icon, Label, Menu } from "semantic-ui-react";

class SurveyList extends Component {
  renderSurveys = () => {
    if (this.props.userSurveys.length === 0) {
      return (
        <div className="w-75">
          <Image
            className="w-100"
            src={emptySurveysPicture}
            alt="empty survey image"
          />
        </div>
      );
    } else {
      return this.props.userSurveys.reverse().map(survey => {
        return (
          <Card className="fast-transition zoom m-3" color="teal">
            <Card.Content>
              <Card.Header>{survey.title}</Card.Header>
              <Card.Meta>{survey.subject}</Card.Meta>
              <Card.Description>{survey.body}</Card.Description>
              <Card.Meta>
                Date shiped: {new Date(survey.dateSent).toLocaleDateString()}
              </Card.Meta>
            </Card.Content>
            <Card.Content extra className="text-center">
              <Menu compact>
                <Menu.Item as="a" disabled>
                  <Icon name="thumbs up outline" /> Yes
                  <Label color="teal" floating>
                    {survey.yes}
                  </Label>
                </Menu.Item>
                <Menu.Item as="a" disabled>
                  <Icon name="thumbs down outline" /> No
                  <Label className="NoValues" floating>
                    {survey.no}
                  </Label>
                </Menu.Item>
              </Menu>
            </Card.Content>
          </Card>
        );
      });
    }
  };
  render() {
    return (
      <div className="flex-grow-1">
        <Card.Group className="d-flex justify-content-center">
          {this.renderSurveys()}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userSurveys: state.userSurveys }; // this object is what is passed as props into SongList components
};

export default connect(mapStateToProps)(SurveyList);
