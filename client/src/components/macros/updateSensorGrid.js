import React from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "helpers/reactstrap";

const parseActions = ({ timelineItems }) => {
  return timelineItems.map(t => ({ ...t, args: JSON.parse(t.args) }));
};
const getArmyContacts = steps => {
  return steps
    .reduce((acc, step) => {
      const actions = parseActions(step);
      return acc.concat(
        actions
          .filter(e => e.event === "setArmyContacts")
          .map(e => e.args.armyContacts)
      );
    }, [])
    .flat();
};
export default ({ steps, currentStep, updateArgs, args, client }) => {
  const armyContacts = getArmyContacts(steps);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          {armyContacts.map(a => (
            <div key={a.id} style={{ display: "flex" }}>
              <p>{a.label}</p>
            </div>
          ))}
        </Col>
        <Col sm={8} />
      </Row>
    </Container>
  );
};
