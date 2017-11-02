import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Asset } from "../../../helpers/assets";

import "./style.css";

export default props => {
  const data = JSON.parse(props.viewscreen.data);
  return (
    <div className="viewscreen-shipview">
      <Container fluid>
        <Row>
          <Col sm={6}>
            <Asset asset={data.ship || "/Sensor Contacts/Pictures/Default"}>
              {({ src }) => <img alt="ship" src={src} />}
            </Asset>
          </Col>
          <Col sm={{ size: 4, offset: 1 }}>
            <h1>{data.name}</h1>
            <h2>{data.text}</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
