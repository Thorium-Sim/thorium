import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Asset } from "../../helpers/assets";
import "./ShipLogo.css";

export default ({ simulator }) => {
  const { assets } = simulator;
  return (
    <Container fluid>
      <div className="ShipLogo">
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <Asset asset={assets.logo}>
              {({ src }) => (
                <img
                  alt="Ship Logo"
                  role="presentation"
                  className="logo img-fluid"
                  src={src}
                />
              )}
            </Asset>
            <div className="shadow" />
          </Col>
        </Row>
      </div>
    </Container>
  );
};
