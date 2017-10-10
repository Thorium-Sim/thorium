import React from "react";
import { Container, Row, Col } from "reactstrap";
import Engines from "./engines";

export default props => {
  return (
    <Container className="jr-flight">
      <Row>
        <Col sm={8} />
        <Col sm={4}>
          <Engines {...props} />
        </Col>
      </Row>
    </Container>
  );
};
