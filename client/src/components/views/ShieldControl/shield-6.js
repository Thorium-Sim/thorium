import React from "react";
import { Container, Row, Col, Button } from "helpers/reactstrap";
import shieldStyle from "./shieldStyle";
import DamageOverlay from "../helpers/DamageOverlay";
import FrequencyArrows from "./frequencyArrows";

const ShieldData = ({ s, simulator, state, _toggleShields }) => {
  return (
    <Col sm="6" key={s.id} className="shieldControlBox">
      <DamageOverlay
        system={s}
        message={`${s.name} Shields Offline`}
        style={{ fontSize: "30px" }}
      />
      <h4>{s.name}</h4>
      <h5 className="integrity">
        Integrity: {`${Math.round(s.integrity * 100)}%`}
      </h5>
      <FrequencyArrows shields={s} simulator={simulator} />
      <Button
        color="success"
        block
        disabled={state.disabledButton[s.id]}
        onClick={_toggleShields.bind(this, s)}
      >{`${s.state ? "Lower" : "Raise"} ${s.name} Shields`}</Button>
    </Col>
  );
};
export default ({ shields, startLoop, state, _toggleShields, simulator }) => {
  const { assets } = simulator;
  return (
    <Container fluid className="shields">
      <Row>
        <Col sm="5" className="flex-column">
          <Row>
            <Col sm={{ size: 9, offset: 2 }}>
              <div
                className="shieldBubble"
                style={{ boxShadow: shieldStyle(shields) }}
              >
                <div
                  alt="ship"
                  style={{
                    width: "100%",
                    height: "30vh",
                    backgroundImage: `url("/assets${assets.top}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                  className="shieldImage"
                  draggable="false"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, offset: 2 }} style={{ marginTop: "20px" }}>
              <div
                className="shieldBubble"
                style={{ boxShadow: shieldStyle(shields, true) }}
              >
                <div
                  alt="ship"
                  style={{
                    width: "100%",
                    height: "20vh",
                    backgroundImage: `url("/assets/${assets.side}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                  className="shieldImage"
                  draggable="false"
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={{ size: 5, offset: 1 }} className="flex-column">
          <Row className="flex-max auto-scroll">
            {shields.map(s => {
              return (
                <ShieldData
                  key={s.id}
                  s={s}
                  startLoop={startLoop}
                  state={state}
                  _toggleShields={_toggleShields}
                  simulator={simulator}
                />
              );
            })}
          </Row>
          <Row style={{ marginTop: "20px" }} className="shield-activate">
            <Col sm={{ size: 6 }}>
              <Button
                color="success"
                block
                disabled={state.disabledButton.down}
                onClick={_toggleShields.bind(this, "down")}
              >
                Lower All Shields
              </Button>
            </Col>
            <Col sm={{ size: 6 }}>
              <Button
                color="success"
                block
                disabled={state.disabledButton.up}
                onClick={_toggleShields.bind(this, "up")}
              >
                Raise All Shields
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
