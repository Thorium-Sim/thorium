import React from "react";
import {Container, Row, Col} from "helpers/reactstrap";

const Environment = props => {
  const {decks} = props;
  // console.info(decks);
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>Hello World</Col>
      </Row>
    </Container>
  );
};

export default Environment;
