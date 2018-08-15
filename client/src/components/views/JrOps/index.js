import React from "react";
import { Container, Row, Col } from "reactstrap";

import Crystals from "./crystals";
import Transporter from "./transporter";
import TractorBeam from "./tractorBeam";

import "./style.scss";

export default props => (
  <Container className="card-jrOps">
    <Row>
      <Col sm={5}>
        <Transporter {...props} />
      </Col>
      <Col sm={{ size: 5, offset: 2 }}>
        <TractorBeam {...props} />
      </Col>
    </Row>
    <Row>
      <Crystals {...props} />
    </Row>
  </Container>
);
