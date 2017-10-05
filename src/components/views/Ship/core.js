import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";

const SHIP_CORE_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        bridgeCrew
        radiation
      }
    }
  }
`;

class ShipCore extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: SHIP_CORE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.data.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
  updateBridgeCrew = crew => {
    const mutation = gql`
      mutation SetBridgeCrew($simulatorId: ID!, $crew: Int!) {
        changeSimulatorBridgeCrew(simulatorId: $simulatorId, crew: $crew)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      crew
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateRadiation = radiation => {
    const mutation = gql`
      mutation SetRadiation($simulatorId: ID!, $radiation: Float!) {
        changeSimulatorRadiation(
          simulatorId: $simulatorId
          radiation: $radiation
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      radiation
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const simulator = this.props.data.simulators[0];
    const { bridgeCrew, radiation } = simulator.ship;
    return (
      <div className="core-ship">
        <p>Bridge Crew: </p>
        <InputField
          prompt={"What would you like to change the bridge crew to?"}
          onClick={this.updateBridgeCrew}
        >
          {bridgeCrew}
        </InputField>

        <p>Radiation: </p>
        <input
          type="range"
          value={radiation}
          min={0}
          max={1}
          step={0.01}
          onChange={evt => this.updateRadiation(evt.target.value)}
        />
      </div>
    );
  }
}

const SHIP_CORE_QUERY = gql`
  query Ship($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      ship {
        bridgeCrew
        radiation
      }
    }
  }
`;
export default graphql(SHIP_CORE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ShipCore));
