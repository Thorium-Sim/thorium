import React from "react";
import { Container, Row, Col } from "reactstrap";

import "./style.scss";

export default props => {
  const { viewscreen } = props;
  const data = JSON.parse(viewscreen.data);
  return (
    <Container>
      <div className="viewscreen-information">
        <Row>
          <Col sm={12}>
            <h1>Information</h1>
            <p className="info">
              {data.text}
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
