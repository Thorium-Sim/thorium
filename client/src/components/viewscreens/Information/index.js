import React from "react";
import { Container, Row, Col } from "helpers/reactstrap";

import "./style.scss";

export default props => {
  const { viewscreen = { data: "{}" } } = props;
  const data = JSON.parse(viewscreen.data);
  return (
    <Container>
      <div className="viewscreen-information">
        <Row>
          <Col sm={12}>
            <h1>Information</h1>
            <p className="info">{data.text}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
