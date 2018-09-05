import React, { Component } from "react";
import { InputField, OutputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
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
    }
  }
`;

class TransporterCore extends Component {
  state = {};
  componentDidUpdate(prevProps) {
    if (this.props.transporters && this.props.transporters[0]) {
      if (
        prevProps.transporters[0].state === "Charging" &&
        (this.props.data.transporters[0].state === "Targeting" ||
          this.props.data.transporters[0].state === "Inactive")
      ) {
        if (this.state.transported !== true) {
          this.setState({
            transported: true
          });
          setTimeout(() => this.setState({ transported: false }), 4000);
        }
      }
    }
  }
  targets(transporter, result) {
    this.props.client.mutate({
      mutation: gql`
        mutation SetTransporterTargets($transporter: ID!, $targets: Int!) {
          setTransporterTargets(transporter: $transporter, targets: $targets)
        }
      `,
      variables: {
        transporter: transporter.id,
        targets: result
      }
    });
  }
  render() {
    const transporter = this.props.data.loading
      ? { targets: [] }
      : this.props.data.transporters[0];
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TRANSPORTER_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                const transporters = previousResult.transporters.map(
                  transporter => {
                    if (
                      transporter.id ===
                      subscriptionData.data.transporterUpdate.id
                    ) {
                      transporter = subscriptionData.data.transporterUpdate;
                    }
                    return transporter;
                  }
                );
                return Object.assign({}, previousResult, { transporters });
              }
            })
          }
        />
        {this.props.data.loading ? (
          <span>Loading...</span>
        ) : this.props.data.transporters.length > 0 ? (
          <div>
            <OutputField
              alert={transporter.state === "Scanning" || this.state.transported}
            >
              {this.state.transported
                ? "Transported"
                : `${transporter.state} ${
                    transporter.state === "Charging"
                      ? `- ${Math.round(transporter.charge * 100)}%`
                      : ""
                  } `}
            </OutputField>
            <OutputField>{transporter.requestedTarget}</OutputField>
            <OutputField>{transporter.destination}</OutputField>
            <InputField
              prompt="How many transporter targets?"
              onClick={this.targets.bind(this, transporter)}
            >
              {transporter.targets.length}
            </InputField>
          </div>
        ) : (
          "No transporters"
        )}
      </div>
    );
  }
}

const TRANSPORTERS_QUERY = gql`
  query GetTransporters($simulatorId: ID) {
    transporters(simulatorId: $simulatorId) {
      id
      state
      charge
      simulatorId
      targets {
        id
      }
      requestedTarget
      destination
    }
  }
`;

export default graphql(TRANSPORTERS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(TransporterCore));
