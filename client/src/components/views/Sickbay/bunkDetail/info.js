import React from "react";
import { FormGroup, Label, Col, Input } from "reactstrap";
const whichGender = g => {
  if (g === "M") return "Male";
  if (g === "F") return "Female";
  return "Ambiguous";
};
const Info = ({ name, position, age, gender, rank }) => {
  return (
    <div className="patient-info">
      <h4>Details</h4>
      <FormGroup row>
        <Label sm={2}>Name</Label>
        <Col sm={10}>
          <Input readOnly value={name} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Position</Label>
        <Col sm={10}>
          <Input readOnly value={position} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Age</Label>
        <Col sm={10}>
          <Input readOnly value={age} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Gender</Label>
        <Col sm={10}>
          <Input readOnly value={whichGender(gender)} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Rank</Label>
        <Col sm={10}>
          <Input readOnly value={rank} />
        </Col>
      </FormGroup>
    </div>
  );
};
export default Info;
