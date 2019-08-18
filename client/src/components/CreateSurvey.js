import React from "react";
import SurveyForm from "./pages/surveys/SurveyForm";
import SurveyFromReview from "./pages/surveys/SurveyFormReview";
import { reduxForm, Field } from "redux-form";

class CreateSurvey extends React.Component {
  state = { displayReview: false };

  goToReviewPage = formValues => {
    this.setState({ displayReview: true });
  };

  goToSurveyForm = formValues => {
    this.setState({ displayReview: false });
  };

  newOrReviewRender = displayReview => {
    if (displayReview === false) {
      return <SurveyForm onSurveyNext={this.goToReviewPage} />;
    } else {
      return <SurveyFromReview onReviewBack={this.goToSurveyForm} />;
    }
  };
  render() {
    return (
      <div className="container w-75 mrgTop-20vh">
        {this.newOrReviewRender(this.state.displayReview)}
      </div>
    );
  }
}

export default reduxForm({
    form: "surveyForm", // adds form values into the store.
})(CreateSurvey);
  
