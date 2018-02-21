import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button, Media } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import { InputField, OutputField } from "../../generic/core";

import FontAwesome from "react-fontawesome";
import { Asset } from "../../../helpers/assets";

import "./style.css";

const TARGETING_SUB = gql`
  subscription TargetingUpdate($simulatorId: ID) {
    targetingUpdate(simulatorId: $simulatorId) {
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
      }
      classes {
        id
        name
        size
        icon
        speed
        picture
        quadrant
      }
    }
  }
`;

class TargetingCore extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TARGETING_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            navigation: subscriptionData.data.navigationUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  _addTargetClass() {
    const targeting = this.props.data.targeting[0];
    const { assetFolders } = this.props.data;
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
        icon:
          assetFolders.find(a => a.name === "Icons") &&
          assetFolders.find(a => a.name === "Icons").containers[0].fullPath,
        speed: 1,
        picture:
          assetFolders.find(a => a.name === "Pictures") &&
          assetFolders.find(a => a.name === "Pictures").containers[0].fullPath,
        quadrant: 1
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _setTargetClassCount(targetId, count) {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation SetTargetClassCount($id: ID!, $classId: ID!, $count: Int!) {
        setTargetClassCount(id: $id, classId: $classId, count: $count)
      }
    `;
    const classId = targetId;
    const variables = {
      id: targeting.id,
      classId,
      count
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _updateTargetClass(targetId, key, valueArg) {
    let value = valueArg;
    if (value.target) {
      value = value.target.value;
    }
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation UpdateTargetClass($id: ID!, $classInput: TargetClassInput!) {
        updateTargetClass(id: $id, classInput: $classInput)
      }
    `;
    const classInput = { id: targetId };
    classInput[key] = value;
    const variables = {
      id: targeting.id,
      classInput
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _removeTargetClass(classId) {
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
      mutation RemoveTargetClass($id: ID!, $classId: ID!) {
        removeTargetClass(id: $id, classId: $classId)
      }
    `;
    const variables = {
      id: targeting.id,
      classId
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
    const { assetFolders } = this.props.data;
    const targetedContact = targeting.contacts.find(t => t.targeted);
    let contactClass;
    let contactId;
    if (targetedContact) {
      contactClass = targetedContact.class;
      contactId = targetedContact.id;
    }
    return (
      <Container className="targeting-core">
        <Row>
          <Col sm={6}>Targeted System</Col>
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
                <h4>Targeted Contact</h4>
                <Media>
                  <Media left href="#">
                    <Asset asset={targeting.targetedSensorContact.picture}>
                      {({ src }) => (
                        <Media object src={src} alt="Targeted Contact Image" />
                      )}
                    </Asset>
                  </Media>
                  <Media body>
                    <Media heading>
                      {targeting.targetedSensorContact.name}
                    </Media>
                  </Media>
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
          <div>
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
              <Col sm={5}>Label</Col>
              <Col sm={1} />
            </Row>
            <div className="targets-container">
              {targeting.classes.map(t => {
                const contactCount = targeting.contacts.filter(
                  c => c.class === t.id
                ).length;
                return (
                  <Row key={t.id}>
                    <Col sm={4}>
                      <Row>
                        <Col sm={3}>
                          <Button
                            onClick={this._setTargetClassCount.bind(
                              this,
                              t.id,
                              contactCount - 1
                            )}
                            size="sm"
                            color="secondary"
                          >
                            -
                          </Button>
                        </Col>
                        <Col sm={6}>
                          <InputField
                            style={{
                              lineHeight: "16px",
                              height: "16px",
                              width: "100%"
                            }}
                            prompt={"How many targets?"}
                            onClick={this._setTargetClassCount.bind(this, t.id)}
                          >
                            {contactCount}
                          </InputField>
                        </Col>
                        <Col sm={3}>
                          <Button
                            onClick={this._setTargetClassCount.bind(
                              this,
                              t.id,
                              contactCount + 1
                            )}
                            size="sm"
                            color="secondary"
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={1}>
                      <select
                        className="pictureSelect"
                        onChange={this._updateTargetClass.bind(
                          this,
                          t.id,
                          "icon"
                        )}
                        value={t.icon}
                      >
                        {assetFolders
                          .find(a => a.name === "Icons")
                          .containers.map(c => {
                            return (
                              <option key={c.id} value={c.fullPath}>
                                {c.name}
                              </option>
                            );
                          })}
                      </select>
                      <Asset asset={t.icon}>
                        {({ src }) => (
                          <img alt="pic" src={src} role="presentation" />
                        )}
                      </Asset>
                    </Col>
                    <Col sm={1}>
                      <select
                        className="pictureSelect"
                        onChange={this._updateTargetClass.bind(
                          this,
                          t.id,
                          "picture"
                        )}
                        value={t.picture}
                      >
                        {assetFolders
                          .find(a => a.name === "Pictures")
                          .containers.map(c => {
                            return (
                              <option key={c.id} value={c.fullPath}>
                                {c.name}
                              </option>
                            );
                          })}
                      </select>
                      <Asset asset={t.picture}>
                        {({ src }) => (
                          <img alt="pic" src={src} role="presentation" />
                        )}
                      </Asset>{" "}
                    </Col>
                    <Col sm={5}>
                      <InputField
                        style={{
                          lineHeight: "16px",
                          height: "16px",
                          width: "100%"
                        }}
                        prompt={"New target label?"}
                        alert={contactClass === t.id}
                        onClick={this._updateTargetClass.bind(
                          this,
                          t.id,
                          "name"
                        )}
                      >
                        {t.name}
                      </InputField>
                    </Col>
                    <Col sm={1}>
                      <FontAwesome
                        name="ban"
                        className="text-danger"
                        onClick={this._removeTargetClass.bind(this, t.id)}
                      />
                    </Col>
                  </Row>
                );
              })}
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

const TARGETING_QUERY = gql`
  query Targeting($simulatorId: ID, $names: [String]) {
    targeting(simulatorId: $simulatorId) {
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
      }
      classes {
        id
        name
        size
        icon
        speed
        picture
        quadrant
      }
    }
    assetFolders(names: $names) {
      id
      name
      containers {
        id
        name
        fullPath
      }
    }
  }
`;

export default graphql(TARGETING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id,
      names: ["Icons", "Pictures"]
    }
  })
})(withApollo(TargetingCore));
