import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const POP_SUB = gql`
  subscription Population($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId) {
      id
    }
  }
`;

const SIM_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        bridgeCrew
      }
    }
  }
`;

class Population extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: POP_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            crew: subscriptionData.data.crewUpdate
          });
        }
      });
    }
    if (!this.shipsub && !nextProps.data.loading) {
      this.shipsub = nextProps.data.subscribeToMore({
        document: SIM_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.data.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    // Cancel the subscription
    this.sub();
  }
  render() {
    if (this.props.data.loading) return null;
    const crew = this.props.data.crew;
    const { ship } = this.props.data.simulators[0];
    if (!crew || crew.length === 0) return null;
    return (
      <div>
        <Label>Crew Population</Label>
        <div className="status-field">
          {crew.length + (ship.bridgeCrew ? ship.bridgeCrew : 0)}
        </div>
      </div>
    );
  }
}

const POP_QUERY = gql`
  query Population($simulatorId: ID, $simId: String) {
    crew(simulatorId: $simulatorId) {
      id
    }
    simulators(id: $simId) {
      id
      ship {
        bridgeCrew
      }
    }
  }
`;

export default graphql(POP_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(Population);
