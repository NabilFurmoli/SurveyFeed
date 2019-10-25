import React from "react";
import { Button } from "semantic-ui-react";
import SurveyField from "./SurveyField";
import SurveyTextareaField from "./surveyTextareaField";
import { Link } from "react-router-dom";
import validateEmails from "../../../utils/validateEmails";
import { reduxForm, Field } from "redux-form";

class SurveyForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveyNext)}>
        <Field
          type="text"
          name="title"
          label="Survey Title"
          placeHolder="Title"
          component={SurveyField}
        />
        <Field
          type="text"
          name="subject"
          label="Subject Line"
          placeHolder="Subject"
          component={SurveyField}
        />
        <Field
          type="text"
          name="body"
          label="Email Body"
          placeHolder="Body Content"
          component={SurveyTextareaField}
        />
        <Field
          type="text"
          name="emails"
          label="Recipients Email"
          placeHolder="Add commas between emails"
          component={SurveyField}
        />
        <Link to="/surveys">
          <Button content="Cancel" floated="left" />
        </Link>

        <Button
          type="submit"
          color="teal"
          content="Next"
          icon="arrow alternate circle right outline"
          labelPosition="right"
          floated="right"
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "You must provide a title";
  }
  if (!values.subject) {
    errors.subject = "You must provide a subject";
  }
  if (!values.body) {
    errors.body = "You must provide body content";
  }
  if (!values.emails) {
    errors.emails = "You must provide at least one email.";
  }

  if (values.emails) {
    errors.emails = validateEmails(values.emails);
  }

  return errors;
}

export default reduxForm({
  // redux from takes a validate fucntion to validate inputs
  validate: validate,
  // adds form values into the store.
  form: "surveyForm",
  // this does not allow the redux form to empty the values if we go to the other page and come back.
  destroyOnUnmount: false
})(SurveyForm);
