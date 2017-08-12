import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Asset } from "../../helpers/assets";
import "./ShipLogo.scss";

export default ({ simulator }) => {
  return (
    <Container fluid className="ShipLogo">
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <Asset asset="/Misc/Login Logo" simulatorId={simulator.id}>
            {({ src }) =>
              <img role="presentation" className="logo img-fluid" src={src} />}
          </Asset>
          <div className="shadow" />
        </Col>
      </Row>
    </Container>
  );
};
