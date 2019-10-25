import React from "react";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";

import { connect } from "react-redux";
import * as actions from "../../../actions";

const SurveyField = props => {
  // {...props.input}, the input props is given by redux form that passes in events and name of feild.
  console.log("inputs", props.input);
  return (
    <FormGroup row>
      <Label md={2}>{props.label}</Label>
      <Col md={10}>
        <Input {...props.input} placeholder={props.placeHolder} />
      </Col>

      <Col>
        <p className="text-danger col-sm-6 order-sm-2 offset-sm-2 mt-2 mb-2">
          {props.meta.touched && props.meta.error}
        </p>
      </Col>
    </FormGroup>
  );
};

export default connect(
  null,
  actions
)(SurveyField);
