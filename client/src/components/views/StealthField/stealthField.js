import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import Tour from "helpers/tourHelper";
import DamageOverlay from "../helpers/DamageOverlay";
import StealthBoard from "./stealthBoard";
import ChargeBar from "./chargeBar";

import "./style.scss";
import StealthAnimation from "./stealthAnimation";

const trainingSteps = [
  {
    selector: ".stealth-row",
    content:
      "The ship’s stealth field allows it to move through space without being detected by other starships. If your stealth field needs to be activated, click this button to activate or deactivate the stealth field."
  },
  {
    selector: ".stealth-board",
    content:
      "This dashboard shows the way that the ship’s operations impact the stealth field. Use of some ship functionality may increase the ship’s probability of being detected. For example, sending out messages and other signals makes it obvious to other starships that this ship is around. They may not be able to see the ship, but they’ll notice that someone is there. If you start shooting at them, they will probably realize that something fishy is going on."
  }
];

export default class StealthField extends Component {
  scene = null;
  render() {
    const {
      id,
      state,
      name,
      charge,
      activated,
      systems,
      quadrants,
      simulator,
      clientObj
    } = this.props;
    return (
      <Container fluid className="card-stealthField flex-column">
        <DamageOverlay system={this.props} message={`${name} Offline`} />
        <Row className="stealth-row">
          <Col sm="3">
            {charge && (
              <Row className="charge-row">
                <Col sm={6}>
                  <ChargeBar
                    id={id}
                    value={quadrants.fore}
                    label="Fore"
                    simulator={simulator}
                  />
                </Col>
                <Col sm={6}>
                  <ChargeBar
                    id={id}
                    value={quadrants.port}
                    label="Port"
                    simulator={simulator}
                  />
                </Col>
              </Row>
            )}
          </Col>
          <Col sm="6">
            <div className="stealth" style={{ transform: "rotate(360deg)" }}>
              <div
                alt="ship"
                style={{
                  width: "100%",
                  height: "30vh",
                  backgroundImage: `url("${`/assets/${
                    simulator.assets.side
                  }`}")`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
                draggable="false"
              />
              <StealthAnimation
                id={id}
                activated={activated}
                state={state}
                src={`/assets/${simulator.assets.side}`}
              />
            </div>
            {activated &&
              (state ? (
                <Mutation
                  mutation={gql`
                    mutation DeactivateStealth($id: ID!) {
                      deactivateStealth(id: $id)
                    }
                  `}
                  variables={{ id }}
                >
                  {action => (
                    <Button
                      size="lg"
                      color="warning"
                      className="stealth-button"
                      block
                      onClick={action}
                    >
                      Deactivate {name}
                    </Button>
                  )}
                </Mutation>
              ) : (
                <Mutation
                  mutation={gql`
                    mutation ActivateStealth($id: ID!) {
                      activateStealth(id: $id)
                    }
                  `}
                  variables={{ id }}
                >
                  {action => (
                    <Button
                      size="lg"
                      color="primary"
                      className="stealth-button"
                      block
                      onClick={action}
                    >
                      Activate {name}
                    </Button>
                  )}
                </Mutation>
              ))}
          </Col>
          <Col sm="3">
            {charge && (
              <Row className="charge-row">
                <Col sm={6}>
                  <ChargeBar
                    id={id}
                    value={quadrants.aft}
                    label="Aft"
                    simulator={simulator}
                  />
                </Col>
                <Col sm={6}>
                  <ChargeBar
                    id={id}
                    value={quadrants.starboard}
                    label="Starboard"
                    simulator={simulator}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <StealthBoard systems={systems} state={state} />
        <Tour steps={trainingSteps} client={clientObj} />
      </Container>
    );
  }
}
