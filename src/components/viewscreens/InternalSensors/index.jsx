import React, {Component} from "react";
import gql from "graphql-tag.macro";
import {graphql, withApollo} from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

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
  state = {scan: 0.5};
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
    cancelAnimationFrame(this.frame);
  }
  loop = () => {
    if (!this.looping) return;
    let {scan} = this.state;
    if (scan >= 1) scan = -0.1;
    scan += 0.01;
    this.setState({scan});
    this.frame = requestAnimationFrame(this.loop);
  };
  render() {
    const {scan} = this.state;
    let {reactive, scanning, scanRequest = "", scanResults = ""} = JSON.parse(
      this.props.viewscreen.data,
    );
    if (reactive) {
      if (this.props.data.loading || !this.props.data.sensors) return null;
      scanning = this.props.data.sensors[0].scanning;
      scanRequest = this.props.data.sensors[0].scanRequest;
      scanResults = this.props.data.sensors[0].scanResults;
    }
    const background = `linear-gradient(to right, rgba(252,227,0,0) 0%,rgba(247,223,24,0) ${
      scan * 100 - 5
    }%,rgba(246,223,27,1) ${scan * 100}%,rgba(246,223,30,0) ${
      scan * 100 + 5
    }%,rgba(241,218,54,0) 100%)`;
    const {assets} = this.props.simulator;
    return (
      <div className="viewscreen-internalSensors">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: INTERNAL_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
              },
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  sensors: subscriptionData.data.sensorsUpdate,
                });
              },
            })
          }
        />
        <h1>Internal Scans</h1>
        <div className="ship">
          {scanning && <div className="scanner" style={{background}} />}
          <img alt="ship" src={`/assets${assets.side}`} />
        </div>
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
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id,
    },
  }),
})(withApollo(InternalSensorsViewscreen));
