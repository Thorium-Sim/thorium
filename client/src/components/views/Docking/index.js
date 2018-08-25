import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Clamps, Ramps, Doors } from "./graphics";
import Tour from "../../../helpers/tourHelper";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

const DOCKING_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        clamps
        ramps
        airlock
      }
    }
  }
`;

const mutation = gql`
  mutation DockingChange($simulatorId: ID!, $which: String!, $state: Boolean!) {
    shipDockingChange(simulatorId: $simulatorId, which: $which, state: $state)
  }
`;

class Docking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphic: null
    };
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  undisable = () => {
    this.setState({
      disabled: false
    });
  };
  clamps() {
    this.setState({
      graphic: "clamps",
      disabled: true
    });
    this.timeout = setTimeout(this.undisable, 3000);
    const variables = {
      simulatorId: this.props.simulator.id,
      which: "clamps",
      state: !this.props.data.simulators[0].ship.clamps
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  ramps() {
    this.setState({
      graphic: "ramps",
      disabled: true
    });
    this.timeout = setTimeout(this.undisable, 1000);
    const variables = {
      simulatorId: this.props.simulator.id,
      which: "ramps",
      state: !this.props.data.simulators[0].ship.ramps
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  doors() {
    this.setState({
      graphic: "doors",
      disabled: true
    });
    this.timeout = setTimeout(this.undisable, 2000);
    const variables = {
      simulatorId: this.props.simulator.id,
      which: "airlock",
      state: !this.props.data.simulators[0].ship.airlock
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (this.props.data.loading || !this.props.data.simulators) return null;
    const { graphic, disabled } = this.state;
    const { clamps, ramps, airlock } = this.props.data.simulators[0].ship;
    return (
      <Container fluid className="docking">
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
          <Col sm={5}>
            <div className="flex">
              <Button
                disabled={disabled}
                block
                size="lg"
                className="clamps-button"
                color="primary"
                onClick={this.clamps.bind(this)}
              >
                {clamps ? "Detach" : "Attach"} Docking Clamps
              </Button>
              <Button
                disabled={disabled}
                block
                size="lg"
                className="ramps-button"
                color="primary"
                onClick={this.ramps.bind(this)}
              >
                {ramps ? "Retract" : "Extend"} Boarding Ramps
              </Button>
              <Button
                disabled={disabled}
                block
                size="lg"
                className="doors-button"
                color="primary"
                onClick={this.doors.bind(this)}
              >
                {airlock ? "Close" : "Open"} Airlock Doors
              </Button>
            </div>
          </Col>
          <Col className="graphics" sm={{ size: 2, offset: 2 }}>
            {graphic === "clamps" && <Clamps transform={clamps} />}
            {graphic === "ramps" && <Ramps transform={ramps} />}
            {graphic === "doors" && <Doors transform={airlock} />}
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

const trainingSteps = [
  {
    selector: ".clamps-button",
    content:
      "Use this button to attach or detach docking clamps when you dock with a space station. These clamps will stabilize your ship for safe disembarking."
  },
  {
    selector: ".ramps-button",
    content:
      "Use this button to extend and retract the boarding ramps to allow crew and other visitors to enter and exit the ship."
  },
  {
    selector: ".doors-button",
    content:
      "Use this button to open and close the airlock doors, effectively sealing off your ship from space. Because space is a vacuum - totally empty, even of oxygen and other gases - leaving these doors open when you launch may lead to deadly consequences. It also may cause precious oxygen to disappear into the vacuum of space."
  }
];

const DOCKING_QUERY = gql`
  query Simulator($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      ship {
        clamps
        ramps
        airlock
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
})(withApollo(Docking));
