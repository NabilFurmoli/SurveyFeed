import React from 'react'
import { Button} from 'semantic-ui-react'
import SurveyField from './SurveyField';

// reduxFrom connect you to the  store similler how connect does in react-redux
import { reduxForm, Field } from 'redux-form';


class SurveyForm extends React.Component {
    render () {
        return (
            <form onSubmit={ this.props.handleSubmit(values => console.log(values))}>
                <Field type="text" name="surveyTitle" component={SurveyField}/>
                <Button type='submit'>Submit</Button>
            </form>
          )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
