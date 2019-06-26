import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row, Container } from "helpers/reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Docked = ({
  id,
  clientId,
  fighterImage,
  shield,
  hull,
  torpedoCount,
  hypercard
}) => {
  const [delay, setDelay] = useState(10);
  useInterval(() => {
    setDelay(delay => Math.max(0, delay - 1));
  }, 1000);
  return (
    <Container className="card-crm-docked">
      <Row>
        <Col sm={6}>
          <h1>Fighter is Docked</h1>
          <div className="fighter-strength">
            <div>Shield Strength: {Math.round(shield * 100)}%</div>
            <div>Hull Integrity: {Math.round(hull * 100)}%</div>
            <div>Torpedo Count: {torpedoCount}</div>
            <Mutation
              mutation={gql`
                mutation RestockTorpedos($id: ID!, $clientId: ID!) {
                  crmRestockTorpedos(id: $id, clientId: $clientId)
                }
              `}
              variables={{
                id,
                clientId
              }}
            >
              {action => (
                <Button
                  className="restock-button"
                  color="warning"
                  disabled={torpedoCount === 6}
                  onClick={action}
                >
                  Restock Torpedos
                </Button>
              )}
            </Mutation>
          </div>
        </Col>
        <Col sm={6}>
          <img
            className="docked-fighter-image"
            src={`/assets${fighterImage}`}
            draggable="false"
            alt="Fighter"
          />
        </Col>
      </Row>
      <Row className="buttons-area">
        {hypercard && (
          <Col sm={{ size: 6 }}>
            <Mutation
              mutation={gql`
                mutation Hypercard($clientId: ID!) {
                  setClientHypercard(clientId: $clientId, component: null)
                }
              `}
              variables={{ clientId }}
            >
              {action => (
                <Button
                  block
                  size="lg"
                  color="danger"
                  onClick={action}
                  className="station-control"
                >
                  Return Normal Station Control
                </Button>
              )}
            </Mutation>
          </Col>
        )}
      </Row>
      <Row>
        <Col sm={{ size: 6 }}>
          <Mutation
            mutation={gql`
              mutation Undock($id: ID!, $clientId: ID!) {
                crmSetFighterDocked(id: $id, clientId: $clientId, docked: false)
              }
            `}
            variables={{
              id,
              clientId
            }}
          >
            {action => (
              <Button
                block
                size="lg"
                color="success"
                className="launch-button"
                disabled={delay > 0}
                onClick={action}
              >
                Launch Fighter {delay > 0 ? `(${delay})` : null}
              </Button>
            )}
          </Mutation>
        </Col>
      </Row>
    </Container>
  );
};

export default Docked;
