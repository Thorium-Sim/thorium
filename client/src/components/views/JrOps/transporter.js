import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Row, Col } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
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
    target: { x: 0, y: 0 },
    targetedContact: false,
    charge: 0
  };
  charging = false;
  constructor(props) {
    super(props);
    this.mouseMove = this.mouseMove.bind(this);
  }
  componentDidMount() {
    this.loop();
  }
  componentWillUnmount() {
    this.transporterSubscription && this.transporterSubscription();
    this.charging = false;
    cancelAnimationFrame(this.looping);
  }
  mouseDown = () => {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("touchmove", this.mouseMove);
    document.addEventListener("touchend", this.mouseUp);
  };
  mouseMove = evt => {
    const targetGrid = ReactDOM.findDOMNode(this).querySelector(
      ".target-holder"
    );
    const { x, y, width, height } = targetGrid.getBoundingClientRect();
    const target = {};
    target.x = Math.min(
      0.9,
      Math.max(0, ((evt.clientX || evt.touches[0].clientX) - x) / width)
    );
    target.y = Math.min(
      0.9,
      Math.max(0, ((evt.clientY || evt.touches[0].clientY) - y) / height)
    );
    const transporter = this.props.data.transporters[0];
    let targetedContact = null;
    transporter.targets.forEach(t => {
      const transTarget = t.position;
      if (
        transTarget.x < target.x + 0.1 &&
        transTarget.x > target.x - 0.1 &&
        transTarget.y < target.y + 0.1 &&
        transTarget.y > target.y - 0.1
      ) {
        target.x = transTarget.x;
        target.y = transTarget.y;
        targetedContact = t.id;
      }
    });
    this.setState({
      target,
      targetedContact
    });
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchmove", this.mouseMove);
    document.removeEventListener("touchend", this.mouseUp);
    this.charging = false;
  };
  loop = () => {
    if (this.charging) {
      this.setState({
        charge: Math.min(1, this.state.charge + 0.005)
      });
      if (this.state.charge === 1) {
        this.completeTransport(this.state.targetedContact);
        this.charging = false;
        this.setState({
          targetedContact: null
        });
      }
    } else {
      this.setState({
        charge: Math.max(0, this.state.charge - 0.01)
      });
    }
    this.looping = requestAnimationFrame(this.loop);
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
  completeTransport(target) {
    const transporter = this.props.data.transporters[0];
    this.props.client.mutate({
      mutation: gql`
        mutation CompleteTransport($transporter: ID!, $target: ID!) {
          completeTransport(transporter: $transporter, target: $target)
        }
      `,
      variables: {
        transporter: transporter.id,
        target
      }
    });
  }
  render() {
    if (this.props.data.loading || !this.props.data.transporters) return null;
    const transporter = this.props.data.transporters[0];
    const { target, targetedContact, charge } = this.state;
    if (!transporter) return <h1>No transporter system</h1>;
    return (
      <Row className="transporters">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TRANSPORTER_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  transporters: previousResult.transporters.map(transporter => {
                    if (
                      transporter.id ===
                      subscriptionData.data.transporterUpdate.id
                    ) {
                      return subscriptionData.data.transporterUpdate;
                    }
                    return transporter;
                  })
                });
              }
            })
          }
        />
        <Col sm={12}>
          <h1>Transporter Relay</h1>
        </Col>
        <Col sm={8}>
          <div style={{ position: "relative" }}>
            <div className="lines-holder">
              {transporter.state === "Scanning" && (
                <div className="scanner-bar" />
              )}

              <div className="lines-x">
                {Array(Math.round(10))
                  .fill(0)
                  .map((y, i) => (
                    <div key={`line-x-${i}`} className="line-x" />
                  ))}
              </div>
              <div className="lines-y">
                {Array(10)
                  .fill(0)
                  .map((y, i) => (
                    <div key={`line-y-${i}`} className="line-y" />
                  ))}
              </div>
            </div>
            {transporter.state === "Targeting" && (
              <div className="target-holder">
                <img
                  alt="target"
                  src={require("./target1.svg")}
                  className="target"
                  draggable="false"
                  onMouseDown={this.mouseDown}
                  onTouchStart={this.mouseDown}
                  style={{
                    transform: `translate(${target.x * 400}%, ${target.y *
                      400}%)`
                  }}
                />
                {transporter.targets.map(t => (
                  <img
                    alt="target"
                    key={t.id}
                    src={require("./target2.svg")}
                    className="target"
                    draggable="false"
                    style={{
                      transform: `translate(${t.position.x * 400}%, ${t.position
                        .y * 400}%)`,
                      pointerEvents: "none"
                    }}
                  />
                ))}
              </div>
            )}
            <div className="spacer" />
          </div>
          {transporter.state === "Scanning" ? (
            <Button block color="danger" onClick={this.cancelScan}>
              Cancel Transport
            </Button>
          ) : (
            <Button block color="primary" onClick={this.beginScan}>
              Scan for Target
            </Button>
          )}
        </Col>
        <Col sm={4}>
          <div className="spacer" />
          <div
            className="charge-bar"
            style={{ height: `calc(${charge * 100}% - 50px)` }}
          />
          <Button
            disabled={!targetedContact}
            block
            color="primary"
            onMouseDown={() => {
              document.addEventListener("mouseup", this.mouseUp);
              this.charging = true;
            }}
            onTouchStart={() => {
              document.addEventListener("touchend", this.mouseUp);
              this.charging = true;
            }}
          >
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
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Transporters));
