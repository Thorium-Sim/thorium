import React from "react";
import { Container, Row, Col } from "reactstrap";
//import { Asset } from "../../../helpers/assets";

//import "./style.css";

export default props => {
  //const data = JSON.parse(props.viewscreen.data);
  return (
    <div className="viewscreen-tacticalMap">
      <Container fluid>
        <Row>
          <Col>
            <p>Tactical Map</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
