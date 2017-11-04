import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import { Asset } from "../../../helpers/assets";
import shieldStyle from "./shieldStyle";
import DamageOverlay from "../helpers/DamageOverlay";

const ShieldData = ({ s, startLoop, state, _toggleShields }) => {
  return (
    <Col sm="6" key={s.id} className="shieldControlBox">
      <DamageOverlay
        system={s}
        message={`${s.name} Shields Offline`}
        style={{ fontSize: "30px" }}
      />
      <h4>{s.name}</h4>
      <h5>Integrity: {`${Math.round(s.integrity * 100)}%`}</h5>
      <h5>Frequency:</h5>
      <Row>
        <Col sm="auto">
          <h4 className="arrow">
            <FontAwesome
              name="arrow-down"
              onMouseDown={startLoop.bind(this, "down", s)}
            />
          </h4>
        </Col>
        <Col sm="6">
          <h5 className="text-center">{`${Math.round(
            state.frequency[s.id] * 100
          ) / 100} MHz`}</h5>
        </Col>
        <Col sm="auto">
          <h4 className="arrow">
            <FontAwesome
              name="arrow-up"
              onMouseDown={startLoop.bind(this, "up", s)}
            />
          </h4>
        </Col>
      </Row>
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
  return (
    <Container fluid className="shields">
      <Row>
        <Col sm="6">
          <Row>
            <Col sm={{ size: 9, offset: 2 }} style={{ maxHeight: "50vh" }}>
              <div
                className="shieldBubble"
                style={{ boxShadow: shieldStyle(shields) }}
              >
                <Asset asset={"/Ship Views/Top"} simulatorId={simulator.id}>
                  {({ src }) => (
                    <img
                      alt="shield"
                      role="presentation"
                      className="mw-100 shieldImage"
                      draggable="false"
                      src={src}
                    />
                  )}
                </Asset>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, offset: 2 }} style={{ marginTop: "50px" }}>
              <div
                className="shieldBubble"
                style={{ boxShadow: shieldStyle(shields, true) }}
              >
                <Asset asset={"/Ship Views/Right"} simulatorId={simulator.id}>
                  {({ src }) => (
                    <img
                      alt="shield"
                      role="presentation"
                      className="mw-100 shieldImage"
                      draggable="false"
                      src={src}
                    />
                  )}
                </Asset>
              </div>
            </Col>
          </Row>
        </Col>
        <Col style={{ marginTop: "10px" }} sm={{ size: 5, offset: 1 }}>
          <Row>
            {shields.map(s => {
              return (
                <ShieldData
                  key={s.id}
                  s={s}
                  startLoop={startLoop}
                  state={state}
                  _toggleShields={_toggleShields}
                />
              );
            })}
          </Row>
          <Row style={{ marginTop: "20px" }}>
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
