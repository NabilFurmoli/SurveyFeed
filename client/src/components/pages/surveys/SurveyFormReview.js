import React from "react";
import { Spinner } from "reactstrap";
import { Container, Message, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import { withRouter } from "react-router-dom";

class SurveyFormReview extends React.Component {
  state = { isSubmitting: false };

  submitButtonRender = () => {
    if (this.state.isSubmitting) {
      return (
        <Button color="teal" floated="right">
          <Spinner className="mr-3" size="sm" color="light" />
          Submitting...
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            this.setState({ isSubmitting: true });
            this.props.sendSurvey(this.props.formValues, this.props.history); // history helps you connect to the the first upmost browser router
          }}
          type="submit"
          color="teal"
          content="Ship Survey"
          icon="shipping fast"
          labelPosition="right"
          floated="right"
        />
      );
    }
  };
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
        {this.submitButtonRender()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
// withRouter(SurveyFormReview) passes into props a property called history
