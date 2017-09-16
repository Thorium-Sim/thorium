import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Destination,
  Speed,
  Population,
  Coolant,
  Targeted,
  Battery,
  Damaged,
  AlertCondition,
  Stealth,
  Radiation
} from "./components";
import "./style.scss";

export default props => {
  return (
    <Container fluid className="status-card">
      <Row>
        <Col sm={3}>
          <Destination {...props} />
          <Speed {...props} />
          <Targeted {...props} />
          <Population {...props} />
          <Radiation {...props} />
          {/*<Label>Water</Label>
          <Dots level={0.5} color={"rgb(0,128,255)"} />*/}
          <Battery {...props} />
          <Coolant {...props} />
        </Col>
        <Col sm={6}>
          <Stealth {...props} />
          {/**/}
        </Col>
        <Col sm={3}>
          <Damaged {...props} />
          <AlertCondition {...props} />
        </Col>
      </Row>
    </Container>
  );
};
