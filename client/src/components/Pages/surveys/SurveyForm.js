import React from 'react'
import { Button} from 'semantic-ui-react'
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../../utils/validateEmails';

// reduxFrom connect you to the  store similler how connect does in react-redux
import { reduxForm, Field } from 'redux-form';


class SurveyForm extends React.Component {
    render () {
        return (
            <form onSubmit={ this.props.handleSubmit(values => console.log(values))}>
                <Field 
                    type="text" 
                    name="surveyTitle" 
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
                    component={SurveyField}
                />
                 <Field 
                    type="text" 
                    name="emails" 
                    label="Recipients Email" 
                    placeHolder="Add commas between emails" 
                    component={SurveyField}
                />
                <Link to="/surveys">
                    <Button color='' content='Cancel'  floated="left" /> 
                </Link>
                   
                <Button type="submit" color='teal' content='Next' 
                    icon='arrow alternate circle right outline' labelPosition='right' floated="right" />
            </form>
          )
    }
}

function validate(values) {
    const errors = {}; // if error is returned empty reduc form thinks everyhting is fine, else does not proceed.

    if (!values.surveyTitle) {
        errors.surveyTitle = 'You must provide a title'
    } 
    if (!values.subject) {
        errors.subject = 'You must provide a subject'
    }
    if (!values.body) {
        errors.body = 'You must provide body content'
    }
    if (!values.emails) {
        errors.emails = 'You must provide at least one email.'
    }

    if (values.emails){
        errors.emails = validateEmails(values.emails);
    }
    
   
    return errors;
}

export default reduxForm({
    validate: validate, // reduc from takes a validate fucntion to validate inputs
    form: 'surveyForm'
})(SurveyForm);
