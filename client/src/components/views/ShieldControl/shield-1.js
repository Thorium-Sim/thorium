import React from "react";
import { Container, Row, Col, Button } from "helpers/reactstrap";
import FontAwesome from "react-fontawesome";
import DamageOverlay from "../helpers/DamageOverlay";
import { shieldColor } from "./shieldStyle";

export default ({ shields, startLoop, state, _toggleShields, simulator }) => {
  const s = shields[0];
  const color = shieldColor(s);
  const { assets } = simulator;
  const [disabled, setDisabled] = React.useState();
  React.useEffect(() => {
    if (disabled) {
      const timeout = setTimeout(() => setDisabled(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [disabled]);
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
          <h2>Frequency:</h2>
          <Row className="frequency">
            <Col sm="auto">
              <h1 className="arrow">
                <FontAwesome
                  name="arrow-down"
                  onMouseDown={() => {
                    if (disabled) return;
                    startLoop("down", s);
                    setDisabled(true);
                  }}
                  onTouchStart={() => {
                    if (disabled) return;
                    startLoop("down", s);
                    setDisabled(true);
                  }}
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
                  onMouseDown={() => {
                    if (disabled) return;
                    startLoop("up", s);
                    setDisabled(true);
                  }}
                  onTouchStart={() => {
                    if (disabled) return;
                    startLoop("up", s);
                    setDisabled(true);
                  }}
                />
              </h1>
            </Col>
          </Row>
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
