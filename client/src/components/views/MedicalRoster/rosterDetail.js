import React from "react";
import { Row, Col, FormGroup, Label, Input, Button } from "helpers/reactstrap";

const RosterDetail = ({
  action,
  id,
  update,
  firstName,
  lastName,
  age,
  rank,
  gender,
  position
}) => (
  <Row className="crew-form">
    <Col sm={6}>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          disabled={id}
          value={firstName || ""}
          onChange={e => update({ firstName: e.target.value })}
        />
      </FormGroup>
    </Col>
    <Col sm={6}>
      <FormGroup>
        <Label>Last Name</Label>
        <Input
          disabled={id}
          value={lastName || ""}
          onChange={e => update({ lastName: e.target.value })}
        />
      </FormGroup>
    </Col>
    <Col sm={6}>
      <FormGroup>
        <Label>Age</Label>
        <Input
          disabled={id}
          value={age || ""}
          type="number"
          min="0"
          max="110"
          onChange={e => update({ age: e.target.value })}
        />
      </FormGroup>
    </Col>
    <Col sm={6}>
      <FormGroup>
        <Label>Gender</Label>
        <Input
          disabled={id}
          type="select"
          value={gender || ""}
          onChange={e => update({ gender: e.target.value })}
        >
          <option value="" disabled />
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="X">Ambiguous</option>
        </Input>
      </FormGroup>
    </Col>
    <Col sm={6}>
      <FormGroup>
        <Label>Rank</Label>
        <Input
          disabled={id}
          value={rank || ""}
          onChange={e => update({ rank: e.target.value })}
        />
      </FormGroup>
    </Col>
    <Col sm={6}>
      <FormGroup>
        <Label>Position</Label>
        <Input
          disabled={id}
          value={position || ""}
          onChange={e => update({ position: e.target.value })}
        />
      </FormGroup>
    </Col>
    <Col sm={{ size: 6, offset: 6 }}>
      {!id && (
        <Button
          color="success"
          className="finish-adding-crew"
          block
          onClick={action}
        >
          Add Crew
        </Button>
      )}
    </Col>
  </Row>
);
export default RosterDetail;
