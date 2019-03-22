import React, { Fragment, Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import Tour from "helpers/tourHelper";
import Slider from "../NavigationAdvanced/slider.js";
import PowerLine from "./powerLine";
import DamageOverlay from "../helpers/DamageOverlay";
import { throttle } from "helpers/debounce";
import shieldStyle from "../ShieldControl/shieldStyle";

const throttleUpdate = throttle(
  (action, variables) => action({ variables }),
  300
);
class JumpDrive extends Component {
  state = { env: this.props.env };
  trainingSteps = () => {
    const { displayName } = this.props;
    return [
      {
        selector: ".nothing",
        content: (
          <FormattedMessage
            id="jump-drive-training-1"
            defaultMessage="The {systemName} is a system which creates an envelope of spacetime around your ship. This envelope serves two purposes: 1) increasing momentum by moving the space around you; 2) decreasing time dilation effects of high velocities. In short, it helps your ship to move faster than the speed of light, getting you to your destination in shorter periods of time. Note that you must use your conventional engines in conjunction with the {systemName}. The {systemName} does not provide propulsion to your ship."
            values={{ systemName: displayName }}
          />
        )
      },
      {
        selector: ".slider-bar",
        content: (
          <FormattedMessage
            id="jump-drive-training-2"
            defaultMessage="This is where you can change the envelope size surrounding your ship. A larger envelope requires more power to maintain, but gives you room for other ships to follow you in your envelope. Make sure you have sufficient power in your system before using a higher envelope size. Click the button below to activate the {systemName}."
            values={{ systemName: displayName }}
          />
        )
      },
      {
        selector: ".power-adjustments",
        content: (
          <FormattedMessage
            id="jump-drive-training-3"
            defaultMessage="There are four emitters that create your envelope, one for each side of your ship. You must ensure that each has sufficient power to operate as you travel at high speeds. As you travel at high speeds, the emitters will become stressed with the continual warping of spacetime around your ship. If they have enough power supplied, the emitters will be able to compensate for the additional stress."
          />
        )
      },
      {
        selector: ".ship-holder",
        content: (
          <FormattedMessage
            id="jump-drive-training-4"
            defaultMessage="Here you can see the current size of your envelope, along with the current stress levels, represented with color. The circle background color shows the overall stress level, with blue meaning everything is fine and red meaning you are in danger of envelope collapse. Once activated, graphical representations of the individual emitter stress levels will appear, allowing you to keep track of which emitters are doing well and which need more power."
          />
        )
      },
      {
        selector: ".stress-container",
        content: (
          <FormattedMessage
            id="jump-drive-training-5"
            defaultMessage="You can also see the overall stress of the emitters here. Make sure this stays low. If the envelope collapses without being deactivated first, it could be very dangerous for you and your crew."
          />
        )
      }
    ];
  };
  componentDidUpdate(prevProps) {
    if (prevProps.env !== this.props.env) {
      this.setState({ env: this.props.env });
    }
  }
  updatePowerLevel = (action, sector, level) => {
    const {
      id,
      sectors,
      power: { power }
    } = this.props;
    const powerUsed = ["fore", "aft", "port", "starboard"]
      .filter(s => s !== sector)
      .reduce((prev, next) => prev + sectors[next].level, 0);
    if (powerUsed + level > power && sectors[sector].level < level) return;
    action({ variables: { id, sector, level } });
  };
  calculateTopPower = sector => {
    const {
      sectors,
      power: { power }
    } = this.props;
    const powerUsed = ["fore", "aft", "port", "starboard"]
      .filter(s => s !== sector)
      .reduce((prev, next) => prev + sectors[next].level, 0);
    return power - powerUsed;
  };
  canActivate = () => {
    const { sectors, enabled } = this.props;
    return (
      enabled &&
      sectors.fore.level > 0 &&
      sectors.aft.level > 0 &&
      sectors.starboard.level > 0 &&
      sectors.port.level > 0
    );
  };
  render() {
    const {
      id,
      simulator: { assets },
      sectors,
      stress,
      activated,
      damage,
      power: { power, powerLevels }
    } = this.props;
    const { env } = this.state;
    const sectorStates = ["starboard", "port", "fore", "aft"].map((s, i) => ({
      position: i + 1,
      state: activated,
      integrity: 1 - sectors[s].offset
    }));
    return (
      <Container fluid className="card-jumpDrive">
        <DamageOverlay
          system={{ damage, power: { power, powerLevels } }}
          message={`Jump Drive Offline`}
        />
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
            <Mutation
              mutation={gql`
                mutation ActivateJumpdrive($id: ID!, $activated: Boolean!) {
                  setJumpdriveActivated(id: $id, activated: $activated)
                }
              `}
            >
              {action => (
                <Fragment>
                  {activated ? (
                    <Button
                      style={{ marginTop: "50px" }}
                      block
                      size="lg"
                      color="warning"
                      onClick={() =>
                        action({ variables: { id, activated: false } })
                      }
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
                      disabled={!this.canActivate()}
                      color="warning"
                      onClick={() =>
                        action({ variables: { id, activated: true } })
                      }
                    >
                      <FormattedMessage
                        defaultMessage="Activate"
                        id="jump-drive-sector-activate"
                      />
                    </Button>
                  )}
                </Fragment>
              )}
            </Mutation>
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
                  <Row className="power-adjustments">
                    <Col sm={6}>
                      <PowerLine
                        powerLevels={[12]}
                        maxPower={12}
                        onChange={value =>
                          this.updatePowerLevel(action, "aft", value)
                        }
                        topPower={this.calculateTopPower("aft")}
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
                          this.updatePowerLevel(action, "port", value)
                        }
                        topPower={this.calculateTopPower("port")}
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
                          this.updatePowerLevel(action, "fore", value)
                        }
                        topPower={this.calculateTopPower("fore")}
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
                          this.updatePowerLevel(action, "starboard", value)
                        }
                        topPower={this.calculateTopPower("starboard")}
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
        <Tour steps={this.trainingSteps()} client={this.props.clientObj} />
      </Container>
    );
  }
}
export default JumpDrive;
