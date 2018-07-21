import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Measure from "react-measure";
import Tour from "reactour";

import Grid from "./gridDom";
import TorpedoLoading from "../TorpedoLoading";
import { /*PhaserArc, */ PhaserBeam, PhaserFire } from "../PhaserCharging";
import DamageOverlay from "../helpers/DamageOverlay";
import TargetControls from "./targetControls";
import Coordinates from "./coordinates";

const trainingSteps = [
  {
    selector: ".targeting-screen",
    content:
      "This screen is used to target and attack contacts outside the ship. Be careful - the weapons on your ship are dangerous."
  },
  {
    selector: ".targeting-area",
    content:
      "Use this area to lock onto a target. Once a target is locked on, you will be able to acurately fire your weapons at it."
  },
  {
    selector: ".phaser-holder",
    content:
      "You can fire your phasers from this area. Phasers are energy weapons which you must first charge before you can fire them. Phasers are effective against shielding systems. Press and hold the fire button to fire your phasers. Keep an eye on the heat - if your phasers overheat, you won't be able to fire them until they cool down."
  },
  {
    selector: ".torpedos",
    content:
      "Here you can fire your torpedos at the target. Torpedos are explosive projectile weapons and can deal more damage than phasers. However, you have a limited supply so use them wisely."
  }
];

const TARGETING_QUERY = gql`
  query Targeting($simulatorId: ID) {
    targeting(simulatorId: $simulatorId) {
      id
      type
      name
      quadrants
      coordinateTargeting
      calculatedTarget {
        x
        y
        z
      }
      enteredTarget {
        x
        y
        z
      }
      targetedSensorContact {
        id
        picture
        name
      }
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      contacts {
        id
        quadrant
        icon
        size
        name
        speed
        system
        picture
        targeted
        destroyed
        moving
      }
    }
    phasers(simulatorId: $simulatorId) {
      id
      simulatorId
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      name
      beams {
        id
        state
        charge
        heat
      }
      arc
      coolant
    }
  }
`;

const TARGETING_SUB = gql`
  subscription TargetingUpdate($simulatorId: ID) {
    targetingUpdate(simulatorId: $simulatorId) {
      id
      type
      name
      quadrants
      coordinateTargeting
      calculatedTarget {
        x
        y
        z
      }
      enteredTarget {
        x
        y
        z
      }
      targetedSensorContact {
        id
        picture
        name
      }
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      contacts {
        id
        quadrant
        icon
        size
        name
        speed
        system
        picture
        targeted
        destroyed
        moving
      }
    }
  }
`;

const PHASERS_SUB = gql`
  subscription PhasersUpdate($simulatorId: ID!) {
    phasersUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      name
      beams {
        id
        state
        charge
        heat
      }
      arc
      coolant
    }
  }
`;

class Targeting extends Component {
  constructor(props) {
    super(props);
    this.state = { disabledPhasers: {} };
    this.targetingSubscription = null;
    this.phasersSubscription = null;
    this.phaserLoopId = null;
    this.mouseup = () => {
      const phasers = this.props.data.phasers[0];
      const mutation = gql`
        mutation StopFiring($id: ID!) {
          stopPhaserBeams(id: $id)
        }
      `;
      const variables = {
        id: phasers.id
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    };
    this.stopCoolant = () => {
      const phasers = this.props.data.phasers[0];
      const mutation = gql`
        mutation PhaserCool($id: ID!, $beamId: ID) {
          coolPhaserBeam(id: $id, beamId: $beamId)
        }
      `;
      const variables = {
        id: phasers.id,
        beamId: null
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.targetingSubscription && !nextProps.data.loading) {
      this.targetingSubscription = nextProps.data.subscribeToMore({
        document: TARGETING_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            targeting: subscriptionData.data.targetingUpdate
          });
        }
      });
      this.phasersSubscription = nextProps.data.subscribeToMore({
        document: PHASERS_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            phasers: subscriptionData.data.phasersUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.phasersSubscription && this.phasersSubscription();
    this.targetingSubscription && this.targetingSubscription();
  }
  targetContact(targetId) {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation TargetingTarget($systemId: ID!, $targetId: ID!) {
        targetTargetingContact(id: $systemId, targetId: $targetId)
      }
    `;
    const variables = {
      systemId: targeting.id,
      targetId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  untargetContact = targetId => {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation UntargetContact($systemId: ID!, $targetId: ID!) {
        untargetTargetingContact(id: $systemId, targetId: $targetId)
      }
    `;
    const variables = {
      systemId: targeting.id,
      targetId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  targetSystem = (targetId, system) => {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation TargetContact($systemId: ID!, $targetId: ID!, $system: String!) {
        targetSystem(id: $systemId, targetId: $targetId, system: $system)
      }
    `;
    const variables = {
      systemId: targeting.id,
      targetId,
      system
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  chargePhasers(beamId) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation ChargePhaserBeam($id: ID!, $beamId: ID!) {
        chargePhaserBeam(id: $id, beamId: $beamId)
      }
    `;
    const variables = {
      id: phasers.id,
      beamId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  dischargePhasers(beamId) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation DischargePhaserBeam($id: ID!, $beamId: ID!) {
        dischargePhaserBeam(id: $id, beamId: $beamId)
      }
    `;
    const variables = {
      id: phasers.id,
      beamId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  coolPhasers(beamId) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation PhaserCool($id: ID!, $beamId: ID) {
        coolPhaserBeam(id: $id, beamId: $beamId)
      }
    `;
    const variables = {
      id: phasers.id,
      beamId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    document.addEventListener("mouseup", this.stopCoolant);
    document.addEventListener("touchend", this.stopCoolant);
  }
  interactionTime = 0;
  firePhasers = (beamId, e) => {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    if (Date.now() - this.interactionTime < 2000) return;
    this.interactionTime = Date.now();
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation FirePhasers($id: ID!, $beamId: ID!) {
        firePhaserBeam(id: $id, beamId: $beamId)
      }
    `;
    const variables = {
      id: phasers.id,
      beamId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      disabledPhasers: Object.assign({}, this.state.disabledPhasers, {
        [beamId]: true
      })
    });
    setTimeout(() => {
      this.setState({
        disabledPhasers: Object.assign({}, this.state.disabledPhasers, {
          [beamId]: false
        })
      });
    }, 3000);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("touchend", this.mouseup);
    return false;
  };
  render() {
    if (this.props.data.loading || !this.props.data.targeting) return null;
    const targeting = this.props.data.targeting && this.props.data.targeting[0];
    const phasers = this.props.data.phasers && this.props.data.phasers[0];
    if (!targeting) return <p>No Targeting</p>;
    const targetedContact = targeting.contacts.find(t => t.targeted);
    return (
      <Container fluid className="targeting-control">
        <Row>
          <Col sm="5" className="targeting-area">
            <DamageOverlay system={targeting} message="Targeting Offline" />
            {targeting.coordinateTargeting ? (
              <Coordinates targeting={targeting} client={this.props.client} />
            ) : (
              <div style={{ height: "100%", minHeight: "40vh" }}>
                <Measure
                  bounds
                  onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds });
                  }}
                >
                  {({ measureRef }) => (
                    <div
                      ref={measureRef}
                      style={{ height: "100%", minHeight: "40vh" }}
                    >
                      <Grid
                        dimensions={this.state.dimensions}
                        targetContact={this.targetContact.bind(this)}
                        untargetContact={this.untargetContact.bind(this)}
                        targets={targeting.contacts}
                      />
                    </div>
                  )}
                </Measure>
                <small>
                  Follow a contact with your mouse to target. Click to target
                  stationary contacts.
                </small>
              </div>
            )}
          </Col>
          <Col sm="7">
            <DamageOverlay system={phasers} message="Phasers Offline" />
            <div className="phaser-holder">
              {phasers &&
                phasers.beams.map(
                  (p, i, arr) =>
                    arr.length > 2 ? (
                      <PhaserFire
                        key={p.id}
                        {...p}
                        disabled={this.state.disabledPhasers[p.id]}
                        index={i + 1}
                        firePhasers={this.firePhasers.bind(this)}
                        coolPhasers={this.coolPhasers.bind(this)}
                      />
                    ) : (
                      <PhaserBeam
                        key={p.id}
                        {...p}
                        disabled={this.state.disabledPhasers[p.id]}
                        index={i + 1}
                        chargePhasers={this.chargePhasers.bind(this)}
                        dischargePhasers={this.dischargePhasers.bind(this)}
                        coolPhasers={this.coolPhasers.bind(this)}
                        firePhasers={this.firePhasers.bind(this)}
                        targeting={true}
                      />
                    )
                )}
            </div>
            <Row>
              <Col sm="8">
                {phasers && <PhaserCoolant coolant={phasers.coolant} />}
              </Col>
            </Row>
            {/*<PhaserArc client={this.props.client} phaserId={phasers.id} arc={phasers.arc} />*/}
          </Col>
        </Row>
        <Row className="target-area">
          <Col sm={7}>
            <TargetControls
              targetedContact={
                targeting.coordinateTargeting
                  ? targeting.targetedSensorContact
                  : targetedContact
              }
              untargetContact={this.untargetContact}
              targetSystem={this.targetSystem}
            />
          </Col>
          <Col sm={4} className="torpedos">
            <TorpedoLoading
              simulator={this.props.simulator}
              maxLaunchers={1}
              targeting={true}
            />
          </Col>
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

const PhaserCoolant = ({ coolant }) => {
  return (
    <div>
      <p>Coolant</p>
      <div className="chargeHolder coolantHolder">
        <div className="coolant" style={{ width: `${coolant * 100}%` }} />
      </div>
    </div>
  );
};
export default graphql(TARGETING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Targeting));
