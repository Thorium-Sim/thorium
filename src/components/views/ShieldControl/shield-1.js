import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import assetPath from "../../../helpers/assets";
import DamageOverlay from "../helpers/DamageOverlay";
import { shieldColor } from "./shieldStyle";

export default ({ shields, startLoop, state, _toggleShields }) => {
  const s = shields[0];
  const color = shieldColor(s);
  return (
    <Container className="shields">
      <DamageOverlay system={s} message={`${s.name} Shields Offline`} />
      <Row>
        <Col sm="7">
          <img
            role="presentation"
            className="mw-100 ccw-90 shieldImage"
            style={{ filter: `drop-shadow(${color} 0px 0px 30px)` }}
            draggable="false"
            src={assetPath("/Ship Views/Top", "default", "png", false)}
          />
        </Col>
        <Col style={{ marginTop: "100px" }} sm={{ size: 4, offset: 1 }}>
          <h2>Integrity:</h2>
          <h1>{`${Math.round(s.integrity * 100)}%`}</h1>
          <h2>Frequency:</h2>
          <Row>
            <Col sm="auto">
              <h1 className="arrow">
                <FontAwesome
                  name="arrow-down"
                  onMouseDown={startLoop.bind(this, "down", s)}
                />
              </h1>
            </Col>
            <Col sm="7">
              <h2 className="text-center">
                {`${Math.round(state.frequency[s.id] * 100) / 100} MHz`}
              </h2>
            </Col>
            <Col sm="auto">
              <h1 className="arrow">
                <FontAwesome
                  name="arrow-up"
                  onMouseDown={startLoop.bind(this, "up", s)}
                />
              </h1>
            </Col>
          </Row>
          <Button
            color="success"
            size="lg"
            block
            disabled={state.disabledButton[s.id]}
            onClick={_toggleShields.bind(this, s)}
          >{`${s.state ? "Lower" : "Raise"} Shields`}</Button>
        </Col>
      </Row>
    </Container>
  );
};
