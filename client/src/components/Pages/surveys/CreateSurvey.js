
import React from 'react'
import SurveyForm from './SurveyForm';
import {BrowserRouter, Route} from 'react-router-dom';



class CreateSurvey extends React.Component {
    render () {
        return (
            <div className="container">
                <SurveyForm/>
            </div>
          )
    }
}

export default CreateSurvey



