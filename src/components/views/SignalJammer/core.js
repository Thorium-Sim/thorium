import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";

const SUB = gql`
  subscription SignalJammerUpdate($id: ID!) {
    signalJammersUpdate(simulatorId: $id) {
      id
      damage {
        damaged
      }
      power {
        power
        powerLevels
      }
      active
      level
      strength
      signals {
        id
        type
        level
        power
      }
    }
  }
`;

class SignalJammerCore extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          id: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            signalJammers: subscriptionData.data.signalJammersUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  setSignal = (type, signals) => {
    const { data: { loading, signalJammers } } = this.props;
    if (loading || !signalJammers) return;
    const signalJammer = signalJammers[0];
    if (!signalJammer) return;
    const mutation = gql`
      mutation SetSignalJammer($id: ID!, $type: String!, $signals: Int!) {
        signalJammerSignals(id: $id, type: $type, signals: $signals)
      }
    `;

    const variables = {
      id: signalJammer.id,
      type,
      signals
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { data: { loading, signalJammers } } = this.props;
    if (loading || !signalJammers) return null;
    const signalJammer = signalJammers[0];
    if (!signalJammer) return <p>No Signal Jammer</p>;
    return (
      <div className="core-signalJammer">
        <div style={{ display: "flex" }}>
          Comm{" "}
          <InputField
            prompt="What would you like to set this signal to?"
            onClick={value => this.setSignal("comm", value)}
            style={{ width: "40px" }}
          >
            {signalJammer.signals.filter(s => s.type === "comm").length}
          </InputField>
        </div>
        <div style={{ display: "flex" }}>
          Tact{" "}
          <InputField
            prompt="What would you like to set this signal to?"
            onClick={value => this.setSignal("tactical", value)}
            style={{ width: "40px" }}
          >
            {signalJammer.signals.filter(s => s.type === "tactical").length}
          </InputField>
        </div>
        <div style={{ display: "flex" }}>
          Sens{" "}
          <InputField
            prompt="What would you like to set this signal to?"
            onClick={value => this.setSignal("sensors", value)}
            style={{ width: "40px" }}
          >
            {signalJammer.signals.filter(s => s.type === "sensors").length}
          </InputField>
        </div>
      </div>
    );
  }
}

const QUERY = gql`
  query SignalJammer($id: ID!) {
    signalJammers(simulatorId: $id) {
      id
      damage {
        damaged
      }
      power {
        power
        powerLevels
      }
      active
      level
      strength
      signals {
        id
        type
        level
        power
      }
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.simulator.id
    }
  })
})(withApollo(SignalJammerCore));
