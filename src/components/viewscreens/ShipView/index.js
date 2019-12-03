import React from "react";
import {Container, Row, Col} from "helpers/reactstrap";

import "./style.scss";

export default props => {
  const data = JSON.parse(props.viewscreen.data);
  return (
    <div className="viewscreen-shipview">
      <Container fluid>
        <Row>
          <Col sm={6}>
            <img
              alt="ship"
              src={`/assets${data.ship || "/Sensor Contacts/Pictures/Default"}`}
            />
          </Col>
          <Col sm={{size: 4, offset: 1}}>
            <h1>{data.name}</h1>
            <h2>{data.text}</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
