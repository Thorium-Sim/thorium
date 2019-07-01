import React from "react";
import { Container, Row, Col, Button } from "helpers/reactstrap";
import DamageOverlay from "../helpers/DamageOverlay";
import { shieldColor } from "./shieldStyle";
import FrequencyArrows from "./frequencyArrows";

export default ({ shields, state, _toggleShields, simulator }) => {
  const s = shields[0];
  const color = shieldColor(s);
  const { assets } = simulator;
  return (
    <Container className="shields">
      <DamageOverlay system={s} message={`${s.name} Shields Offline`} />
      <Row>
        <Col sm="7">
          <div
            alt="ship"
            className="shield-ship-image"
            style={{
              backgroundImage: `url("/assets${assets.top}")`,
              filter: `drop-shadow(${color} 0px 0px 30px)`
            }}
            draggable="false"
          />
        </Col>
        <Col style={{ marginTop: "100px" }} sm={{ size: 4, offset: 1 }}>
          <h2>Integrity:</h2>
          <h1 className="integrity">{`${Math.round(s.integrity * 100)}%`}</h1>
          <FrequencyArrows noSetAll shields={s} simulator={simulator} />
          <Button
            color="success"
            size="lg"
            block
            className="shield-activate"
            disabled={state.disabledButton[s.id]}
            onClick={_toggleShields.bind(this, s)}
          >{`${s.state ? "Lower" : "Raise"} Shields`}</Button>
        </Col>
      </Row>
    </Container>
  );
};
