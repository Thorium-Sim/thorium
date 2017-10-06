import React from "react";
import { Container, Row, Col } from "reactstrap";

import Crystals from "./crystals";

import "./style.scss";

export default props =>
  <Container className="card-jrOps">
    <Row>
      <Col sm={6} />
      <Col sm={6} />
    </Row>
    <Row>
      <Crystals {...props} />
    </Row>
  </Container>;
