import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Slider from "../NavigationAdvanced/slider.js";
import PowerLine from "./powerLine";
import { throttle } from "../../../helpers/debounce";
import shieldStyle from "../ShieldControl/shieldStyle";

const throttleUpdate = throttle(
  (action, variables) => action({ variables }),
  300
);
class JumpDrive extends Component {
  state = { env: this.props.env };
  componentDidUpdate(prevProps) {
    if (prevProps.env !== this.props.env) {
      this.setState({ env: this.props.env });
    }
  }
  render() {
    const {
      id,
      simulator: { assets },
      sectors,
      stress,
      activated,
      power: { power }
    } = this.props;
    const { env } = this.state;
    const sectorStates = ["fore", "aft", "port", "starboard"].map((s, i) => ({
      position: i + 1,
      state: true,
      integrity: 1 - sectors[s].offset
    }));
    return (
      <Container fluid className="card-jumpDrive">
        <Row>
          <Col sm={3} style={{ height: "80%" }}>
            <Mutation
              mutation={gql`
                mutation SetJumpDriveEnv($id: ID!, $env: Float!) {
                  setJumpdriveEnvs(id: $id, envs: $env)
                }
              `}
            >
              {action => (
                <Slider
                  numbers={[6, 5, 4, 3, 2, 1]}
                  defaultLevel={(env - 1) / 5}
                  onChange={(value, numbers) => {
                    this.setState({ env: value * (numbers.length - 1) + 1 });
                    throttleUpdate(action, {
                      id,
                      env: value * (numbers.length - 1) + 1
                    });
                  }}
                />
              )}
            </Mutation>
            {activated ? (
              <Button
                style={{ marginTop: "50px" }}
                block
                size="lg"
                color="warning"
              >
                <FormattedMessage
                  defaultMessage="Deactivate"
                  id="jump-drive-sector-deactivate"
                />
              </Button>
            ) : (
              <Button
                style={{ marginTop: "50px" }}
                block
                size="lg"
                color="warning"
              >
                <FormattedMessage
                  defaultMessage="Activate"
                  id="jump-drive-sector-activate"
                />
              </Button>
            )}
          </Col>
          <Col sm={6}>
            <div className="flex-column">
              <div
                className="flex-max ship-holder"
                style={{
                  backgroundColor: `hsla(${200 - stress * 200},100%, 50%, 0.3)`,
                  transform: `scale(${1 - (6 - env) / 20})`,
                  boxShadow: shieldStyle(sectorStates)
                }}
              >
                <div className="spacer" />
                <div
                  className="ship-image"
                  style={{
                    backgroundImage: `url('/assets${assets.top}')`,
                    backgroundSize: `${((6 - env) / 6) * 80 + 20}%`
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>
                  <FormattedMessage
                    defaultMessage="Sector Power Adjustment"
                    id="jump-drive-sector-power"
                  />
                </h4>
                <h3>
                  <FormattedMessage
                    defaultMessage="Power Available: {power}"
                    values={{ power }}
                    id="jump-drive-power-available"
                  />
                </h3>
              </div>
              <Mutation
                mutation={gql`
                  mutation SetSectorLevel(
                    $id: ID!
                    $sector: String!
                    $level: Int!
                  ) {
                    setJumpdriveSectorLevel(
                      id: $id
                      sector: $sector
                      level: $level
                    )
                  }
                `}
              >
                {action => (
                  <Row>
                    <Col sm={6}>
                      <PowerLine
                        powerLevels={[12]}
                        maxPower={12}
                        onChange={value =>
                          action({
                            variables: { id, sector: "aft", level: value }
                          })
                        }
                        label={
                          <FormattedMessage
                            defaultMessage="Aft"
                            id="jump-drive-sector-aft"
                          />
                        }
                        power={sectors.aft.level}
                      />
                      <PowerLine
                        powerLevels={[12]}
                        maxPower={12}
                        onChange={value =>
                          action({
                            variables: { id, sector: "port", level: value }
                          })
                        }
                        label={
                          <FormattedMessage
                            defaultMessage="Port"
                            id="jump-drive-sector-port"
                          />
                        }
                        power={sectors.port.level}
                      />
                    </Col>
                    <Col sm={6}>
                      <PowerLine
                        powerLevels={[12]}
                        maxPower={12}
                        onChange={value =>
                          action({
                            variables: { id, sector: "fore", level: value }
                          })
                        }
                        label={
                          <FormattedMessage
                            defaultMessage="Fore"
                            id="jump-drive-sector-fore"
                          />
                        }
                        power={sectors.fore.level}
                      />
                      <PowerLine
                        powerLevels={[12]}
                        maxPower={12}
                        onChange={value =>
                          action({
                            variables: { id, sector: "starboard", level: value }
                          })
                        }
                        label={
                          <FormattedMessage
                            defaultMessage="Starboard"
                            id="jump-drive-sector-starboard"
                          />
                        }
                        power={sectors.starboard.level}
                      />
                    </Col>
                  </Row>
                )}
              </Mutation>
            </div>
          </Col>
          <Col sm={3} className="flex-column">
            <h3 className="text-center">
              {" "}
              <FormattedMessage
                defaultMessage="Envelope Stress"
                id="jump-drive-sector-envelope-stress"
                description="The jump drive warp envelope surrounds the ship to keep it safe from subspace. This is an energy wrapper, not a stationery sender."
              />
            </h3>
            <div className="stress-container">
              <div
                className="stress-cover"
                style={{ height: `${(1 - stress) * 100}%` }}
              />
              <div className="stress-bar" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default JumpDrive;
