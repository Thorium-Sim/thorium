import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Container, Row, Col, Button, Media } from "helpers/reactstrap";
import { graphql, withApollo, Mutation } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { publish } from "helpers/pubsub";
import CoreTargets from "./coreTargets";
import "./style.scss";

const fragment = gql`
  fragment TargetingData on Targeting {
    id
    type
    name
    quadrants
    coordinateTargeting
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
      class
      targeted
      system
      destroyed
    }
    range
    classes {
      id
      name
      size
      icon
      speed
      picture
      quadrant
      moving
    }
  }
`;
const TARGETING_SUB = gql`
  subscription TargetingUpdate($simulatorId: ID) {
    targetingUpdate(simulatorId: $simulatorId) {
      ...TargetingData
    }
  }
  ${fragment}
`;
const TARGETING_QUERY = gql`
  query Targeting($simulatorId: ID) {
    targeting(simulatorId: $simulatorId) {
      ...TargetingData
    }
  }
  ${fragment}
`;

class TargetingCore extends Component {
  _addTargetClass = () => {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation AddTargetClass($id: ID!, $classInput: TargetClassInput!) {
        addTargetClass(id: $id, classInput: $classInput)
      }
    `;
    const variables = {
      id: targeting.id,
      classInput: {
        name: "Target",
        size: 1,
        speed: 1,
        quadrant: 1
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  _removeTargetedContact = targetId => {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation RemoveTarget($id: ID!, $targetId: ID!) {
        removeTarget(id: $id, targetId: $targetId)
      }
    `;
    const variables = {
      id: targeting.id,
      targetId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  _setCoordinateTargeting = evt => {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation SetCoordinateTargeting($id: ID!, $which: Boolean!) {
        setCoordinateTargeting(id: $id, which: $which)
      }
    `;
    const variables = {
      id: targeting.id,
      which: evt.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
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
  startRange = () => {
    const targeting = this.props.data.targeting[0];
    publish("setTargetingRange", targeting.range);
    document.addEventListener("mouseup", this.endRange);
  };
  endRange = () => {
    publish("setTargetingRange", null);
    document.removeEventListener("mouseup", this.endRange);
  };
  changeRange = action => e => {
    const targeting = this.props.data.targeting[0];
    publish("setTargetingRange", parseFloat(e.target.value));
    action({
      variables: { id: targeting.id, range: parseFloat(e.target.value) }
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.targeting) return null;
    const targeting = this.props.data.targeting[0];
    if (!targeting) return <p>No Targeting Systems</p>;
    const targetedContact = targeting.contacts.find(t => t.targeted);
    return (
      <Container className="targeting-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TARGETING_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  targeting: subscriptionData.data.targetingUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={3}>Targeted System</Col>
          <Col sm={3}>
            <Mutation
              mutation={gql`
                mutation ClearAll($id: ID!) {
                  clearAllTargetingContacts(id: $id)
                }
              `}
              variables={{ id: targeting.id }}
            >
              {action => (
                <Button color="secondary" size="sm" onClick={action}>
                  Clear All
                </Button>
              )}
            </Mutation>
          </Col>
          <Col sm={3}>
            <label>
              <input
                type="checkbox"
                onChange={this._setCoordinateTargeting}
                checked={targeting.coordinateTargeting}
              />{" "}
              Coordinate Targeting
            </label>
          </Col>
          <Col sm={3}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 2 }}>
                Range: {Math.round(targeting.range * 100)}%{" "}
              </div>
              <Mutation
                mutation={gql`
                  mutation SetRange($id: ID!, $range: Float!) {
                    setTargetingRange(id: $id, range: $range)
                  }
                `}
              >
                {action => (
                  <input
                    style={{ flex: 3 }}
                    type="range"
                    defaultValue={targeting.range}
                    onMouseDown={this.startRange}
                    onChange={this.changeRange(action)}
                    min="0"
                    max="1"
                    step="0.01"
                  />
                )}
              </Mutation>
            </div>
          </Col>
        </Row>
        {targeting.coordinateTargeting ? (
          <div>
            {targeting.targetedSensorContact ? (
              <div>
                <p>Targeted Contact</p>
                <Media>
                  <Media left href="#">
                    <Media
                      object
                      src={`/assets${targeting.targetedSensorContact.picture}`}
                      alt="Targeted Contact Image"
                    />
                  </Media>
                  <Media body>{targeting.targetedSensorContact.name}</Media>
                </Media>
                <Button
                  block
                  color="warning"
                  size="sm"
                  onClick={() =>
                    this.untargetContact(targeting.targetedSensorContact.id)
                  }
                >
                  Unlock Target
                </Button>
              </div>
            ) : (
              <p>No target</p>
            )}
          </div>
        ) : (
          <CoreTargets
            targetedContact={targetedContact}
            removeTargetedContact={this._removeTargetedContact}
            addTargetClass={this._addTargetClass}
            targeting={targeting}
          />
        )}
      </Container>
    );
  }
}

export default graphql(TARGETING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TargetingCore));
