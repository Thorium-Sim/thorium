import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Measure from "react-measure";
import Tour from "reactour";

import Grid from "./gridDom";
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
        iconUrl
        picture
        targeted
        pictureUrl
        destroyed
        moving
      }
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
        iconUrl
        picture
        targeted
        pictureUrl
        destroyed
        moving
      }
    }
  }
`;

class TargetingStandalone extends Component {
  state = {};
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
  render() {
    if (this.props.data.loading || !this.props.data.targeting) return null;
    const targeting = this.props.data.targeting && this.props.data.targeting[0];
    if (!targeting) return <p>No Targeting</p>;
    const targetedContact = targeting.contacts.find(t => t.targeted);

    return (
      <Container
        fluid={!targeting.coordinateTargeting}
        className="targeting-control"
      >
        <Row>
          <Col sm={12}>
            <DamageOverlay system={targeting} message="Targeting Offline" />
            {targeting.coordinateTargeting ? (
              <Coordinates targeting={targeting} client={this.props.client} />
            ) : (
              <div style={{ height: "100%", minHeight: "60vh" }}>
                <Measure
                  bounds
                  onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds });
                  }}
                >
                  {({ measureRef }) => (
                    <div
                      ref={measureRef}
                      style={{ height: "100%", minHeight: "60vh" }}
                    >
                      {this.state.dimensions && (
                        <Grid
                          dimensions={this.state.dimensions}
                          targetContact={this.targetContact.bind(this)}
                          untargetContact={this.untargetContact.bind(this)}
                          targets={targeting.contacts}
                        />
                      )}
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
        </Row>
        <div style={{ height: "30px" }} />
        <Row>
          <Col sm={8}>
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

export default graphql(TARGETING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(TargetingStandalone));
