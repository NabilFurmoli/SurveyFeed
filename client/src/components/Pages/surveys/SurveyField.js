
import React from 'react'
//import { Form} from 'semantic-ui-react'
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

const SurveyField = (props) => {
    return (

        
            <FormGroup row>
                <Label md={2}>{props.label}</Label>
                <Col md={10}>
                    <Input {...props.input} placeholder={props.placeHolder}/>
                </Col>
            </FormGroup>
    )
}

export default SurveyField;
