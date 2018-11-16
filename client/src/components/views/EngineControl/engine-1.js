import React, { Fragment } from "react";
import { Button, Col, Row } from "reactstrap";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

import HeatBar from "./heatbar";

export default withApollo(props => {
  const { engines, setSpeed } = props;
  const applyCoolant = () => {
    const id = props.engines[0].id;
    const mutation = gql`
      mutation CoolEngine($id: ID!, $state: Boolean) {
        engineCool(id: $id, state: $state)
      }
    `;
    const variables = {
      id,
      state: true
    };
    props.client.mutate({
      mutation,
      variables
    });
    document.addEventListener("mouseup", stopCoolant);
    document.addEventListener("touchend", stopCoolant);
  };
  const stopCoolant = () => {
    const id = props.engines[0].id;
    const mutation = gql`
      mutation CoolEngine($id: ID!, $state: Boolean) {
        engineCool(id: $id, state: $state)
      }
    `;
    const variables = {
      id: id,
      state: false
    };
    props.client.mutate({
      mutation,
      variables
    });
  };
  return (
    <Fragment>
      <Col sm="4">
        {engines[0].speeds.map((speed, speedIndex) => {
          let speedWord = speed;
          if (typeof speed === "object") {
            speedWord = speed.text;
          }
          return (
            <Button
              key={`${speed.text}-${speedIndex}`}
              block
              color="primary"
              className="speedBtn"
              disabled={
                engines[0].power.powerLevels.findIndex(
                  p => p > engines[0].power.power
                ) > speedIndex
              }
              onClick={() => {
                setSpeed(engines[0], speedIndex, engines, 0);
              }}
            >
              {speedWord}
            </Button>
          );
        })}
      </Col>
      <Col sm={{ size: 2, offset: 6 }} className="flex-column">
        <Row className="flex-max">
          <Col sm="6">
            <HeatBar
              label="Heat"
              background="linear-gradient(to bottom, #440000 0%,#AA0000 50%,#440000 100%)"
              level={engines[0].heat}
            />
          </Col>
          <Col sm="6">
            <HeatBar
              label="Coolant"
              background="linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)"
              level={engines[0].coolant}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Button
              block
              color="info"
              onMouseDown={applyCoolant}
              onTouchStart={applyCoolant}
            >
              Coolant
            </Button>
          </Col>
        </Row>
      </Col>
    </Fragment>
  );
});
