import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Asset } from "../../../helpers/assets";

import "./style.css";

const INTERNAL_SUB = gql`
  subscription InternalSensorsUpdate($simulatorId: ID) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "internal") {
      id
      scanning
      scanRequest
      scanResults
    }
  }
`;

class InternalSensorsViewscreen extends Component {
  state = { scan: 0.5 };
  sub = null;
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            sensors: subscriptionData.data.sensorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.looping = false;
    this.sensorsSubscription && this.sensorsSubscription();
  }
  loop = () => {
    if (!this.looping) return;
    let { scan } = this.state;
    if (scan >= 1) scan = -0.1;
    scan += 0.01;
    this.setState({ scan });
    requestAnimationFrame(this.loop);
  };
  render() {
    const { scan } = this.state;
    let { reactive, scanning, scanRequest = "", scanResults = "" } = JSON.parse(
      this.props.viewscreen.data
    );
    if (reactive) {
      if (this.props.data.loading || !this.props.data.sensors) return null;
      scanning = this.props.data.sensors[0].scanning;
      scanRequest = this.props.data.sensors[0].scanRequest;
      scanResults = this.props.data.sensors[0].scanResults;
    }
    const background = `linear-gradient(to right, rgba(252,227,0,0) 0%,rgba(247,223,24,0) ${scan *
      100 -
      5}%,rgba(246,223,27,1) ${scan * 100}%,rgba(246,223,30,0) ${scan * 100 +
      5}%,rgba(241,218,54,0) 100%)`;
    return (
      <div className="viewscreen-internalSensors">
        <h1>Internal Scans</h1>
        <Asset asset="/Ship Views/Right" simulatorId={this.props.simulator.id}>
          {({ src }) => (
            <div className="ship">
              {scanning && <div className="scanner" style={{ background }} />}
              <img alt="ship" src={src} />
            </div>
          )}
        </Asset>
        <h2>
          {scanning
            ? `Scanning${scanRequest ? ": " + scanRequest : "..."} `
            : `Scan Result: ${scanResults}`}
        </h2>
      </div>
    );
  }
}

const INTERNAL_QUERY = gql`
  query InternalSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId, domain: "internal") {
      id
      scanning
      scanRequest
      scanResults
    }
  }
`;

export default graphql(INTERNAL_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(InternalSensorsViewscreen));
