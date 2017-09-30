import React from "react";
import { Container, Row, Col } from "reactstrap";

import "./style.scss";

export default props => {
  console.log(props);
  const { viewscreen } = props;
  const data = JSON.parse(viewscreen.data);
  return (
    <Container className="viewscreen-information">
      <Row>
        <Col sm={12}>
          <h1>Information</h1>
          <p>
            {data.text}
          </p>
        </Col>
      </Row>
    </Container>
  );
};
