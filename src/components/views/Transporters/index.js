import React, { Component } from "react";
import gql from "graphql-tag";
import { Button, Row, Col, Input } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import Target from "./targeting";
import Scan from "./transporterScan";
import DamageOverlay from "../helpers/DamageOverlay";
import Tour from "reactour";

import "./style.css";

const TRANSPORTER_SUB = gql`
  subscription TransportersSub($simulatorId: ID) {
    transporterUpdate(simulatorId: $simulatorId) {
      id
      type
      state
      charge
      simulatorId
      targets {
        id
        icon
        moving
        position {
          x
          y
        }
      }
      requestedTarget
      destination
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

const TargetSelect = props => {
  return (
    <Row>
      <Col sm={{ size: 6, push: 3 }} className="target-destination">
        <div className="target-input" style={{ height: "60px" }} />
        <h3>Enter Target:</h3>
        <Input
          defaultValue={props.target}
          onBlur={props.updateTarget}
          placeholder="Enter Target..."
          size="lg"
        />
        <div className="destination-input" style={{ height: "60px" }} />
        <h3>Enter Destination:</h3>
        <Input
          defaultValue={props.destination}
          onBlur={props.updateDestination}
          placeholder="Enter Destination..."
          size="lg"
        />
        <div style={{ height: "30px" }} />
        <Col sm={{ size: 6, push: 3 }}>
          <Button block color={"primary"} onClick={props.beginScan}>
            Begin Scan
          </Button>
        </Col>
      </Col>
    </Row>
  );
};
const Scanning = props => {
  return (
    <Row>
      <Col sm={{ size: 6, offset: 3 }}>
        <Scan />
        <h3 style={{ textAlign: "center", width: "100%" }}>Scanning...</h3>
        <Col sm={{ size: 6, offset: 3 }}>
          <Button block color={"primary"} size="lg" onClick={props.cancelScan}>
            Cancel Scan
          </Button>
        </Col>
      </Col>
    </Row>
  );
};

class Transporters extends Component {
  constructor(props) {
    super(props);
    this.transporterSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.transporterSubscription && !nextProps.data.loading) {
      this.transporterSubscription = nextProps.data.subscribeToMore({
        document: TRANSPORTER_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            transporters: previousResult.transporters.map(transporter => {
              if (
                transporter.id === subscriptionData.data.transporterUpdate.id
              ) {
                return subscriptionData.data.transporterUpdate;
              }
              return transporter;
            })
          });
        }
      });
    }
  }
  updateTarget(transporter, e) {
    this.props.client.mutate({
      mutation: gql`
        mutation SetTransporterTarget($transporter: ID!, $target: String!) {
          setTransportTarget(transporter: $transporter, target: $target)
        }
      `,
      variables: {
        transporter: transporter.id,
        target: e.target.value
      }
    });
  }
  updateDestination(transporter, e) {
    this.props.client.mutate({
      mutation: gql`
        mutation SetTransporterDestination(
          $transporter: ID!
          $destination: String!
        ) {
          setTransportDestination(
            transporter: $transporter
            destination: $destination
          )
        }
      `,
      variables: {
        transporter: transporter.id,
        destination: e.target.value
      }
    });
  }
  setCharge(transporter, charge) {
    this.props.client.mutate({
      mutation: gql`
        mutation SetTransportCharge($transporter: ID!, $charge: Float!) {
          setTransportCharge(transporter: $transporter, charge: $charge)
        }
      `,
      variables: {
        transporter: transporter.id,
        charge
      }
    });
  }
  beginScan(transporter) {
    this.props.client.mutate({
      mutation: gql`
        mutation BeginTransportScan($transporter: ID!) {
          beginTransportScan(transporter: $transporter)
        }
      `,
      variables: {
        transporter: transporter.id
      }
    });
  }
  cancelScan(transporter) {
    this.props.client.mutate({
      mutation: gql`
        mutation CancelTransporterScan($transporter: ID!) {
          cancelTransportScan(transporter: $transporter)
        }
      `,
      variables: {
        transporter: transporter.id
      }
    });
  }
  cancelTransport(transporter) {
    this.props.client.mutate({
      mutation: gql`
        mutation CancelTransport($transporter: ID!) {
          clearTransportTargets(transporter: $transporter)
        }
      `,
      variables: {
        transporter: transporter.id
      }
    });
  }
  completeTransport(transporter, target) {
    this.props.client.mutate({
      mutation: gql`
        mutation CompleteTransport($transporter: ID!, $target: ID!) {
          completeTransport(transporter: $transporter, target: $target)
        }
      `,
      variables: {
        transporter: transporter.id,
        target: target.id
      }
    });
  }
  componentWillUnmount() {
    this.transporterSubscription && this.transporterSubscription();
  }
  render() {
    // Assume that there is only one transporter
    if (this.props.data.loading || !this.props.data.transporters) return null;
    const transporter = this.props.data.transporters[0] || {};
    return (
      <div className="transporter-control">
        <DamageOverlay system={transporter} message="Transporters Offline" />
        {transporter.state === "Inactive" && (
          <TargetSelect
            beginScan={this.beginScan.bind(this, transporter)}
            updateTarget={this.updateTarget.bind(this, transporter)}
            updateDestination={this.updateDestination.bind(this, transporter)}
            target={transporter.requestedTarget}
            destination={transporter.destination}
          />
        )}
        {transporter.state === "Scanning" && (
          <Scanning cancelScan={this.cancelScan.bind(this, transporter)} />
        )}
        {(transporter.state === "Targeting" ||
          transporter.state === "Charging") && (
          <Target
            completeTransport={this.completeTransport.bind(this, transporter)}
            cancelTransport={this.cancelTransport.bind(this, transporter)}
            setCharge={this.setCharge.bind(this, transporter)}
            targets={transporter.targets}
          />
        )}
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </div>
    );
  }
}

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Transporters move objects from one place to another by converting the atoms in the object to energy and reassembling the object on the other side."
  },
  {
    selector: ".target-destination",
    content:
      "Input the name of the object you want to transport, as well as your target destination for transporting. Type something into these boxes, such as 'Apple' for the target and 'Outer Space' for the destination. Click the 'Begin Scan' button before proceeding."
  },
  {
    selector: ".transporterScan",
    content:
      "The computer has to find the target and destination before you can proceed. Wait for your scan to complete."
  },
  {
    selector: ".targetBox",
    content:
      "Drag your target sights over the object you are trying to transport until the “Transport Possible” message appears."
  },
  {
    selector: ".chargeBox",
    content:
      "Once you have locked onto your target, slowly drag the yellow bars upward from the bottom of this box by hovering over the yellow bars and moving your mouse upward. This will maintain the connection with the target until the transporters have fully engaged. If you reach the top, your target will successfully transport to the destination."
  }
];

const TRANSPORTERS_QUERY = gql`
  query GetTransporters($simulatorId: ID) {
    transporters(simulatorId: $simulatorId) {
      id
      type
      state
      charge
      simulatorId
      targets {
        id
        icon
        moving
        position {
          x
          y
        }
      }
      requestedTarget
      destination
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;
export default graphql(TRANSPORTERS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Transporters));
