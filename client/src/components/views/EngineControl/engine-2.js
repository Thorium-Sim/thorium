import React, { Fragment } from "react";
import { Row, Button, Col } from "reactstrap";
import { withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import HeatBar from "./heatbar";
import DamageOverlay from "../helpers/DamageOverlay";
import EngineButtons from "./engineButtons";

export default withApollo(props => {
  const { engines, setSpeed, locked } = props;
  const applyCoolant = id => {
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
    document.addEventListener("mouseup", stopCoolant.bind(this, id));
    document.addEventListener("touchend", stopCoolant.bind(this, id));
  };
  const stopCoolant = id => {
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
      <Col>
        <EngineButtons
          engine={engines[0]}
          locked={locked}
          engines={engines}
          setSpeed={setSpeed}
        />
        <DamageOverlay
          system={engines[0]}
          message={`${engines[0].displayName || engines[0].name} Offline`}
        />
      </Col>
      <Col sm={2} className="flex-column">
        <Row className="flex-max">
          <Col sm={6} className="heat">
            <HeatBar
              label="Heat"
              background="linear-gradient(to bottom, #440000 0%,#aa0000 50%,#440000 100%)"
              level={engines[0].heat}
            />
          </Col>
          <Col sm={6} className="coolant">
            <HeatBar
              label="Coolant"
              background="linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)"
              level={engines[0].coolant}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
            <Button
              block
              className="cool-engines"
              color="info"
              onMouseDown={applyCoolant.bind(this, engines[0].id)}
              onTouchStart={applyCoolant.bind(this, engines[0].id)}
            >
              Coolant
            </Button>
          </Col>
        </Row>
      </Col>
      <Col />
      <Col sm={2} className="flex-column">
        <Row className="flex-max">
          <Col sm={6}>
            <HeatBar
              label="Heat"
              background="linear-gradient(to bottom, #440000 0%,#aa0000 50%,#440000 100%)"
              level={engines[1].heat}
            />
          </Col>
          <Col sm={6}>
            <HeatBar
              label="Coolant"
              background="linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)"
              level={engines[1].coolant}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
            <Button
              block
              color="info"
              onMouseDown={applyCoolant.bind(this, engines[1].id)}
              onTouchStart={applyCoolant.bind(this, engines[1].id)}
            >
              Coolant
            </Button>
          </Col>
        </Row>
      </Col>
      <Col className="flex-column auto-scroll">
        <EngineButtons
          engine={engines[1]}
          locked={locked}
          engines={engines}
          setSpeed={setSpeed}
        />
        <DamageOverlay
          system={engines[1]}
          message={`${engines[1].displayName || engines[1].name} Offline`}
        />
      </Col>
    </Fragment>
  );
});
