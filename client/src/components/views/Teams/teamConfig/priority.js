import React, { Fragment } from "react";
import { FormGroup, Label, Button, Row, Col } from "helpers/reactstrap";
import { titleCase } from "change-case";
const Priority = ({ update, team = {} }) => {
  const updatePriority = priority => {
    update(
      Object.assign({}, team, {
        priority
      })
    );
  };
  return (
    <Fragment>
      <FormGroup className="priority-label" row>
        <Label size="lg" style={{ marginBottom: 0, paddingBottom: 0 }}>
          Priority
        </Label>
      </FormGroup>
      <Row className="team-priority">
        <Col sm={5}>
          <PriorityButton
            update={updatePriority}
            color="info"
            type="low"
            team={team}
          />
        </Col>
        <Col sm={7}>
          <PriorityButton
            update={updatePriority}
            color="success"
            type="normal"
            team={team}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <PriorityButton
            update={updatePriority}
            color="warning"
            type="critical"
            team={team}
          />
        </Col>
        <Col sm={6}>
          <PriorityButton
            update={updatePriority}
            color="danger"
            type="emergency"
            team={team}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

const PriorityButton = ({ update, color, type, team }) => {
  return (
    <Button
      onClick={() => update(type)}
      disabled={!team.id}
      active={team.priority === type}
      block
      color={color}
    >
      {titleCase(type)}
    </Button>
  );
};
export default Priority;
