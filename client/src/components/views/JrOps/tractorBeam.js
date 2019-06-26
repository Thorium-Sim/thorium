import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Row, Col } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
const TRACTORBEAM_SUB = gql`
  subscription TractorBeamUpdate($simulatorId: ID!) {
    tractorBeamUpdate(simulatorId: $simulatorId) {
      id
      state
      target
      strength
      stress
      scanning
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

class TractorBeam extends Component {
  subscription = null;
  state = {
    target: { x: 0, y: 0 },
    targetedContact: false,
    arrow: 0.5,
    actual: 0.5
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
    clearTimeout(this.looping);
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
    let targetedContact = null;
    if (
      target.x + 0.1 > 0.8 &&
      target.x - 0.1 < 0.8 &&
      target.y + 0.1 > 0.8 &&
      target.y - 0.1 < 0.8
    ) {
      target.x = 0.8;
      target.y = 0.8;
      targetedContact = true;
    }
    this.setState({
      target,
      targetedContact
    });
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mousemove", this.arrowMouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchmove", this.mouseMove);
    document.removeEventListener("touchmove", this.arrowMouseMove);
    document.removeEventListener("touchend", this.mouseUp);
    this.charging = false;
  };
  arrowMouseDown = () => {
    document.addEventListener("mousemove", this.arrowMouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("touchmove", this.arrowMouseMove);
    document.addEventListener("touchend", this.mouseUp);
  };
  arrowMouseMove = evt => {
    const arrowContainer = ReactDOM.findDOMNode(this).querySelector(
      ".rainbow-bar"
    );
    const { y, height } = arrowContainer.getBoundingClientRect();
    const actual = Math.min(
      1,
      Math.max(0, ((evt.clientY || evt.touches[0].clientY) - y) / height)
    );
    this.setState({
      actual
    });
  };
  loop = () => {
    this.setState({
      arrow: Math.min(
        1,
        Math.max(0, this.state.arrow + (Math.random() - 0.5) * 0.05)
      )
    });
    this.looping = setTimeout(this.loop, 500);
  };
  beginScan = () => {
    const tractorBeam = this.props.data.tractorBeam[0];

    const mutation = gql`
      mutation TractorBeamScan($id: ID!, $scanning: Boolean!) {
        setTractorBeamScanning(id: $id, scanning: $scanning)
      }
    `;
    const variables = {
      id: tractorBeam.id,
      scanning: true
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  cancelScan = () => {
    const tractorBeam = this.props.data.tractorBeam[0];

    const mutation = gql`
      mutation TractorBeamScan($id: ID!, $scanning: Boolean!) {
        setTractorBeamScanning(id: $id, scanning: $scanning)
      }
    `;
    const variables = {
      id: tractorBeam.id,
      scanning: false
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  toggleBeam = () => {
    const tractorBeam = this.props.data.tractorBeam[0];
    const mutation = gql`
      mutation TractorBeamState($id: ID!, $state: Boolean!) {
        setTractorBeamState(id: $id, state: $state)
      }
    `;
    const variables = {
      id: tractorBeam.id,
      state: !tractorBeam.state
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.tractorBeam) return null;
    const tractorBeam = this.props.data.tractorBeam[0];
    const { target, targetedContact, arrow, actual } = this.state;
    if (!tractorBeam) return <h1>No Tractor Beam system</h1>;
    return (
      <Row className="jr-tractor-beam">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TRACTORBEAM_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  tractorBeam: previousResult.tractorBeam.map(tractorBeam => {
                    if (
                      tractorBeam.id ===
                      subscriptionData.data.tractorBeamUpdate.id
                    ) {
                      return subscriptionData.data.tractorBeamUpdate;
                    }
                    return tractorBeam;
                  })
                });
              }
            })
          }
        />
        <Col sm={12}>
          <h1>Tractor Beam</h1>
        </Col>
        <Col sm={8}>
          <div style={{ position: "relative" }}>
            <div className="lines-holder">
              {tractorBeam.scanning && <div className="scanner-bar" />}

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
            {tractorBeam.target && (
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
                <img
                  alt="target"
                  src={require("./target2.svg")}
                  className="target"
                  draggable="false"
                  style={{
                    transform: `translate(${0.8 * 400}%, ${0.8 * 400}%)`,
                    pointerEvents: "none"
                  }}
                />
              </div>
            )}
            <div className="spacer" />
          </div>
          {tractorBeam.scanning ? (
            <Button block color="danger" onClick={this.cancelScan}>
              Cancel Tractor Beam Scan
            </Button>
          ) : (
            <Button block color="primary" onClick={this.beginScan}>
              Scan for Target
            </Button>
          )}
        </Col>
        <Col sm={4}>
          <div
            className="strength"
            style={{ opacity: tractorBeam.state ? 1 : 0 }}
          >
            <div
              className="arrow actual-arrow"
              style={{ transform: `translateY(${actual * 650}%)` }}
              onMouseDown={this.arrowMouseDown}
              onTouchStart={this.arrowMouseDown}
            />
            <div className="rainbow-bar" />
            <div
              className="arrow correct-arrow"
              style={{ transform: `translateY(${arrow * 1000}%)` }}
            />
          </div>

          <Button
            disabled={!targetedContact}
            block
            color="primary"
            onClick={this.toggleBeam}
          >
            {tractorBeam.state ? "Deactivate" : "Activate"}
          </Button>
        </Col>
      </Row>
    );
  }
}

const TRACTORBEAM_QUERY = gql`
  query TractorBeamInfo($simulatorId: ID!) {
    tractorBeam(simulatorId: $simulatorId) {
      id
      state
      target
      strength
      stress
      scanning
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

export default graphql(TRACTORBEAM_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(TractorBeam));
