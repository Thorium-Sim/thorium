import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Container, Row, Col, Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";
const DOCKING_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      hasLegs
      ship {
        clamps
        ramps
        airlock
        legs
      }
    }
  }
`;

const mutation = gql`
  mutation DockingChange($simulatorId: ID!, $which: String!, $state: Boolean!) {
    shipDockingChange(simulatorId: $simulatorId, which: $which, state: $state)
  }
`;

class DockingCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphic: null
    };
  }
  toggle(which) {
    const variables = {
      simulatorId: this.props.simulator.id,
      which: which,
      state: !this.props.data.simulators[0].ship[which]
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.simulators ||
      !this.props.data.simulators[0]
    )
      return null;
    const { ship } = this.props.data.simulators[0];
    let colSize;
    if (this.props.data.simulators[0].hasLegs) {
      colSize = 3;
    } else {
      colSize = 4;
    }
    return (
      <Container className="docking-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: DOCKING_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={colSize}>
            <Button
              onClick={this.toggle.bind(this, "clamps")}
              size="sm"
              color={ship.clamps ? "danger" : "success"}
            >
              Clamps
            </Button>
          </Col>
          <Col sm={colSize}>
            <Button
              onClick={this.toggle.bind(this, "ramps")}
              size="sm"
              color={ship.ramps ? "danger" : "success"}
            >
              Ramps
            </Button>
          </Col>
          <Col sm={colSize}>
            <Button
              onClick={this.toggle.bind(this, "airlock")}
              size="sm"
              color={ship.airlock ? "danger" : "success"}
            >
              Doors
            </Button>
          </Col>
          {this.props.data.simulators[0].hasLegs &&
            <Col sm={colSize}>
              <Button
                onClick={this.toggle.bind(this, "legs")}
                size="sm"
                color={ship.legs ? "danger" : "success"}
              >
                Legs
              </Button>
            </Col>}
        </Row>
      </Container>
    );
  }
}

const DOCKING_QUERY = gql`
  query Simulator($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      hasLegs
      ship {
        clamps
        ramps
        airlock
        legs
      }
    }
  }
`;

export default graphql(DOCKING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(DockingCore));
