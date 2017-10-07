import React from "react";
import { Button, Row, Col } from "reactstrap";

export default () =>
  <Row className="transporters">
    <Col sm={8}>
      <div style={{ position: "relative" }}>
        <div className="lines-holder">
          <div className="lines-x">
            {Array(Math.round(10))
              .fill(0)
              .map((y, i) => <div key={`line-x-${i}`} className="line-x" />)}
          </div>
          <div className="lines-y">
            {Array(10)
              .fill(0)
              .map((y, i) => <div key={`line-y-${i}`} className="line-y" />)}
          </div>
        </div>
        <div className="spacer" />
      </div>
      <Button block color="primary">
        Scan for Target
      </Button>
      <Button block color="secondary">
        Lock Target
      </Button>
    </Col>
    <Col sm={4}>
      <div className="spacer" />
      <Button block color="primary">
        Energize
      </Button>
    </Col>
  </Row>;
