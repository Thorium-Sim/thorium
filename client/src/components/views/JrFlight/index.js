import React from "react";
import { Container, Row, Col } from "reactstrap";
import Engines from "./engines";
import Thrusters from "./thrusters";
import Navigation from "./navigation";

export default props => {
  return (
    <Container fluid className="jr-flight">
      <Row>
        <Col sm={5}>
          <Thrusters {...props} />
        </Col>
        <Col sm={3}>
          <Navigation {...props} />
        </Col>
        <Col sm={4}>
          <Engines {...props} />
        </Col>
      </Row>
    </Container>
  );
};
