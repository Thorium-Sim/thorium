import React from "react";
import { Row, Col } from "reactstrap";
import Transitioner from "../helpers/transitioner";
import "./style.scss";

class ProbeDescription extends Transitioner {
  render() {
    return (
      <Row className="probeDescription">
        <Col sm={{ size: 6, offset: 3 }}>
          <p>{this.props.description}</p>
        </Col>
      </Row>
    );
  }
}

export default ProbeDescription;
