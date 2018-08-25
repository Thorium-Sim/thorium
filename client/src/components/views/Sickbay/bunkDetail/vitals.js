import React from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const Vitals = ({
  update,
  heartRate,
  temperature,
  bloodPressure,
  o2levels
}) => {
  return (
    <div className="patient-vitals">
      <h4>Vitals</h4>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Label>Heart Rate (BPM):</Label>
            <Input
              type="number"
              defaultValue={heartRate}
              onBlur={e => update("heartRate", parseFloat(e.target.value))}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label>Temperature (F˚):</Label>
            <Input
              type="number"
              defaultValue={temperature}
              onBlur={e => update("temperature", parseFloat(e.target.value))}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label>Blood Pressure (S/D):</Label>
            <Input
              defaultValue={bloodPressure}
              onBlur={e => update("bloodPressure", e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label>
              O<sup>2</sup> Levels:
            </Label>
            <Input
              type="number"
              defaultValue={o2levels}
              onBlur={e => update("o2levels", parseFloat(e.target.value))}
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};
export default Vitals;
