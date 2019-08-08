import React from 'react'
import { Button} from 'semantic-ui-react'
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';

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
                    name="recipients" 
                    label="Recipients" 
                    placeHolder="Recipients list" 
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

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
