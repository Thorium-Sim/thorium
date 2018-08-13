import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import shieldStyle from "./shieldStyle";
import DamageOverlay from "../helpers/DamageOverlay";

const ShieldData = ({ shields, startLoop, state, _toggleShields }) => {
  return (
    <Col key={shields.id} className="shieldControlBox">
      <DamageOverlay
        system={shields}
        message={`${shields.name} Shields Offline`}
        style={{ fontSize: "30px" }}
      />
      <h4>{shields.name}</h4>
      <h5 className="integrity">
        Integrity: {`${Math.round(shields.integrity * 100)}%`}
      </h5>
      <h5>Frequency:</h5>
      <Row className="frequency">
        <Col sm="auto">
          <h4 className="arrow">
            <FontAwesome
              name="arrow-down"
              onMouseDown={startLoop.bind(this, "down", shields)}
              onTouchStart={startLoop.bind(this, "down", shields)}
            />
          </h4>
        </Col>
        <Col sm="6">
          <h5 className="text-center">{`${Math.round(
            state.frequency[shields.id] * 100
          ) / 100} MHz`}</h5>
        </Col>
        <Col sm="auto">
          <h4 className="arrow">
            <FontAwesome
              name="arrow-up"
              onMouseDown={startLoop.bind(this, "up", shields)}
              onTouchStart={startLoop.bind(this, "up", shields)}
            />
          </h4>
        </Col>
      </Row>
      <Button
        color="success"
        block
        disabled={state.disabledButton[shields.id]}
        onClick={_toggleShields.bind(this, shields)}
      >{`${shields.state ? "Lower" : "Raise"} ${shields.name} Shields`}</Button>
    </Col>
  );
};

export default ({ shields, startLoop, state, _toggleShields, simulator }) => {
  const { assets } = simulator;

  return (
    <Container fluid className="shields">
      <Row>
        <Col sm="6" className="flex-center">
          <div
            className="shieldBubble"
            style={{ boxShadow: shieldStyle(shields) }}
          >
            <div
              alt="ship"
              style={{
                backgroundImage: `url("/assets${assets.top}")`
              }}
              className="shieldImage shield-ship-image"
              draggable="false"
            />
          </div>
        </Col>
        <Col sm={{ size: 5, offset: 1 }} className="flex-column">
          <Row>
            {shields.map(s => {
              return (
                <ShieldData
                  key={s.id}
                  shields={s}
                  startLoop={startLoop}
                  state={state}
                  _toggleShields={_toggleShields}
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
