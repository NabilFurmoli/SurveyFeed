
import React from 'react'
import SurveyForm from './SurveyForm';
import {BrowserRouter, Route} from 'react-router-dom';



class CreateSurvey extends React.Component {
    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <SurveyForm/>
                        <Route exact path="/surveys/new/review" component={<div>asdfa</div>}></Route>
                    </div>
                </BrowserRouter>
            </div>
          )
    }
}

export default CreateSurvey



