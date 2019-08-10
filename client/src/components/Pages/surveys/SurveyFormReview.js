import React from "react";
import { Container, Message, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from '../../../actions'
import {withRouter} from 'react-router-dom';

class SurveyFormReview extends React.Component {
  render() {
    return (
      <div>
        <Message>
          <Message.Header>Survey Title</Message.Header>
          <p>{this.props.formValues.title}</p>

          <Divider />

          <Message.Header>Subject Line</Message.Header>
          <p>{this.props.formValues.subject}</p>

          <Divider />

          <Message.Header>Body Content</Message.Header>
          <p>{this.props.formValues.body}</p>

          <Divider />

          <Message.Header>Recipients Email</Message.Header>
          <p>{this.props.formValues.emails}</p>
        </Message>
        <Button
          onClick={this.props.onReviewBack}
          content="Back"
          floated="left"
        />

        <Button
          onClick={() => this.props.sendSurvey(this.props.formValues, this.props.history)}
          type="submit"
          color="teal"
          content="Ship Survey"
          icon="shipping fast"
          labelPosition="right"
          floated="right"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
  // withRouter(SurveyFormReview) passes into props a property called history