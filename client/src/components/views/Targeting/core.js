import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button, Media } from "reactstrap";
import { graphql, withApollo, Mutation } from "react-apollo";
import { OutputField } from "../../generic/core";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import TargetingContact from "./coreTargetingContact";

import "./style.scss";

const queryData = `id
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
classes {
  id
  name
  size
  icon
  speed
  picture
  quadrant
  moving
}`;
const TARGETING_SUB = gql`
  subscription TargetingUpdate($simulatorId: ID) {
    targetingUpdate(simulatorId: $simulatorId) {
      ${queryData}
    }
  }
`;
const TARGETING_QUERY = gql`
  query Targeting($simulatorId: ID) {
    targeting(simulatorId: $simulatorId) {
     ${queryData}
    }
  }
`;

class TargetingCore extends Component {
  _addTargetClass() {
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
  }
  _removeTargetedContact(targetId) {
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
  }
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
  render() {
    if (this.props.data.loading || !this.props.data.targeting) return null;
    const targeting = this.props.data.targeting[0];
    if (!targeting) return <p>No Targeting Systems</p>;
    const targetedContact = targeting.contacts.find(t => t.targeted);
    let contactClass;
    let contactId;
    if (targetedContact) {
      contactClass = targetedContact.class;
      contactId = targetedContact.id;
    }
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
          <Col sm={2}>Targeted System</Col>
          <Col sm={2}>
            <Mutation
              mutation={gql`
                mutation ClearAll($id: ID!) {
                  clearAllContacts(id: $id)
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
          <Col sm={6}>
            <label>
              <input
                type="checkbox"
                onChange={this._setCoordinateTargeting}
                checked={targeting.coordinateTargeting}
              />{" "}
              Coordinate Targeting
            </label>
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
          <div className="contact-targeting">
            <Row>
              <Col sm={8}>
                <OutputField alert={targetedContact}>
                  {targetedContact && targetedContact.system}
                </OutputField>
              </Col>
              <Col sm={4}>
                <Button
                  color="danger"
                  disabled={!targetedContact}
                  size="sm"
                  block
                  onClick={this._removeTargetedContact.bind(this, contactId)}
                >
                  Destroy
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>Count</Col>
              <Col sm={1}>Icon</Col>
              <Col sm={1}>Pic</Col>
              <Col sm={4}>Label</Col>
              <Col sm={1}>Moving</Col>
              <Col sm={1} />
            </Row>
            <div className="targets-container">
              {targeting.classes.map(t => (
                <TargetingContact
                  key={t.id}
                  {...t}
                  targetingId={targeting.id}
                  contacts={targeting.contacts}
                  contactClass={contactClass}
                />
              ))}
            </div>
            <Row>
              <Col sm={12}>
                <Button
                  size={"sm"}
                  block
                  color="success"
                  onClick={this._addTargetClass.bind(this)}
                >
                  Add Targets
                </Button>
              </Col>
            </Row>
          </div>
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
