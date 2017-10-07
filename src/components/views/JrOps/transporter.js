import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

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

class Transporters extends Component {
  transporterSubscription = null;
  state = {
    target: { x: 0, y: 0 }
  };
  constructor(props) {
    super(props);
    this.mouseMove = this.mouseMove.bind(this);
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
  componentWillUnmount() {
    this.transporterSubscription && this.transporterSubscription();
  }
  mouseDown = () => {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseMove = evt => {
    const targetGrid = ReactDOM.findDOMNode(this).querySelector(
      ".target-holder"
    );
    const { x, y, width, height } = targetGrid.getBoundingClientRect();
    const transporter = this.props.data.transporters[0];
    const transTarget = transporter.targets[0].position;
    const target = {};
    target.x = Math.min(0.9, Math.max(0, (evt.clientX - x) / width));
    target.y = Math.min(0.9, Math.max(0, (evt.clientY - y) / height));
    if (
      transTarget.x < target.x + 0.1 &&
      transTarget.x > target.x - 0.1 &&
      transTarget.y < target.y + 0.1 &&
      transTarget.y > target.y - 0.1
    ) {
      target.x = transTarget.x;
      target.y = transTarget.y;
    }
    this.setState({
      target
    });
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
  };
  beginScan = () => {
    const transporter = this.props.data.transporters[0] || null;
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
  };
  cancelScan = () => {
    const transporter = this.props.data.transporters[0] || null;
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
  };
  render() {
    if (this.props.data.loading) return null;
    const transporter = this.props.data.transporters[0];
    const { target } = this.state;
    if (!transporter) return <h1>No transporter system</h1>;
    console.log(transporter);
    return (
      <Row className="transporters">
        <Col sm={12}>
          <h1>Transporter Relay</h1>
        </Col>
        <Col sm={8}>
          <div style={{ position: "relative" }}>
            <div className="lines-holder">
              {transporter.state === "Scanning" &&
                <div className="scanner-bar" />}

              <div className="lines-x">
                {Array(Math.round(10))
                  .fill(0)
                  .map((y, i) =>
                    <div key={`line-x-${i}`} className="line-x" />
                  )}
              </div>
              <div className="lines-y">
                {Array(10)
                  .fill(0)
                  .map((y, i) =>
                    <div key={`line-y-${i}`} className="line-y" />
                  )}
              </div>
            </div>
            {transporter.state === "Targeting" &&
              <div className="target-holder">
                <img
                  src={require("./target1.svg")}
                  className="target"
                  draggable="false"
                  onMouseDown={this.mouseDown}
                  style={{
                    transform: `translate(${target.x * 400}%, ${target.y *
                      400}%)`
                  }}
                />
                <img
                  src={require("./target2.svg")}
                  className="target"
                  draggable="false"
                  style={{
                    transform: `translate(${transporter.targets[0].position.x *
                      400}%, ${transporter.targets[0].position.y * 400}%)`,
                    pointerEvents: "none"
                  }}
                />
              </div>}
            <div className="spacer" />
          </div>
          {transporter.state === "Scanning"
            ? <Button block color="danger" onClick={this.cancelScan}>
                Cancel Transport
              </Button>
            : <Button block color="primary" onClick={this.beginScan}>
                Scan for Target
              </Button>}
          <Button block color="secondary">
            Lock Target
          </Button>
        </Col>
        <Col sm={4}>
          <div className="spacer" />
          <Button block color="primary">
            Energize
          </Button>
        </Col>
      </Row>
    );
  }
}

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
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(Transporters));
