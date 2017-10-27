import React from "react";
import { Row, Col } from "reactstrap";
import Keypad from "../Navigation/keypad";

export default () =>
  <Row>
    <Col>
      <h4>Keypad</h4>
      <Keypad margin />
    </Col>
    <Col>
      <Row>
        <Col>
          <h4>Calculated Coordinates</h4>
          <div className="coordinate-box">
            X: <div>123</div>
          </div>
          <div className="coordinate-box">
            Y: <div>123</div>
          </div>
          <div className="coordinate-box">
            Z: <div>123</div>
          </div>
        </Col>
      </Row>
      <Row className="current-coordinates">
        <Col>
          <h4>Current Coordinates</h4>
          <div className="coordinate-box">
            X: <div>123</div>
          </div>
          <div className="coordinate-box">
            Y: <div>123</div>
          </div>
          <div className="coordinate-box">
            Z: <div>123</div>
          </div>
        </Col>
      </Row>
    </Col>
  </Row>;
