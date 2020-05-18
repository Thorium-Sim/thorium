import React, {Component} from "react";
import gql from "graphql-tag.macro";
import {Button} from "helpers/reactstrap";
import {Mutation, graphql, withApollo} from "react-apollo";
import {InputField, OutputField} from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";

export const SIGNAL_JAMMER_CORE_SUB = gql`
  subscription SignalJammerUpdate($simulatorId: ID!) {
    signalJammersUpdate(simulatorId: $simulatorId) {
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
  setSignal = (type, signals) => {
    const {
      data: {loading, signalJammers},
    } = this.props;
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
      signals,
    };
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  render() {
    const {
      data: {loading, signalJammers},
    } = this.props;
    if (loading || !signalJammers) return null;
    const signalJammer = signalJammers[0];
    if (!signalJammer) return <p>No Signal Jammer</p>;
    return (
      <div className="core-signalJammer">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SIGNAL_JAMMER_CORE_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
              },
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  signalJammers: subscriptionData.data.signalJammersUpdate,
                });
              },
            })
          }
        />
        <Mutation
          mutation={gql`
            mutation UpdateSignalJammer($id: ID!, $active: Boolean) {
              updateSignalJammer(jammer: {id: $id, active: $active})
            }
          `}
          variables={{id: signalJammer.id, active: !signalJammer.active}}
        >
          {action => (
            <OutputField alert={signalJammer.active} onDoubleClick={action}>
              {signalJammer.active ? "Activated" : "Deactivated"}
            </OutputField>
          )}
        </Mutation>
        <div style={{display: "flex"}}>
          Comm{" "}
          <InputField
            prompt="What would you like to set this signal to?"
            onClick={value => this.setSignal("comm", parseInt(value, 10))}
            style={{width: "40px"}}
          >
            {signalJammer.signals.filter(s => s.type === "comm").length}
          </InputField>
          <Button
            size="sm"
            color="success"
            onClick={() =>
              this.setSignal(
                "comm",
                signalJammer.signals.filter(s => s.type === "comm").length + 1,
              )
            }
          >
            Add
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.setSignal("comm", 0)}
          >
            Clear
          </Button>
        </div>
        <div style={{display: "flex"}}>
          Tact{" "}
          <InputField
            prompt="What would you like to set this signal to?"
            onClick={value => this.setSignal("tactical", parseInt(value, 10))}
            style={{width: "40px"}}
          >
            {signalJammer.signals.filter(s => s.type === "tactical").length}
          </InputField>
          <Button
            size="sm"
            color="success"
            onClick={() =>
              this.setSignal(
                "tactical",
                signalJammer.signals.filter(s => s.type === "tactical").length +
                  1,
              )
            }
          >
            Add
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.setSignal("tactical", 0)}
          >
            Clear
          </Button>
        </div>
        <div style={{display: "flex"}}>
          Sens{" "}
          <InputField
            prompt="What would you like to set this signal to?"
            onClick={value => this.setSignal("sensors", parseInt(value, 10))}
            style={{width: "40px"}}
          >
            {signalJammer.signals.filter(s => s.type === "sensors").length}
          </InputField>
          <Button
            size="sm"
            color="success"
            onClick={() =>
              this.setSignal(
                "sensors",
                signalJammer.signals.filter(s => s.type === "sensors").length +
                  1,
              )
            }
          >
            Add
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.setSignal("sensors", 0)}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }
}

export const SIGNAL_JAMMER_CORE_QUERY = gql`
  query SignalJammer($simulatorId: ID!) {
    signalJammers(simulatorId: $simulatorId) {
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

export default graphql(SIGNAL_JAMMER_CORE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id,
    },
  }),
})(withApollo(SignalJammerCore));
