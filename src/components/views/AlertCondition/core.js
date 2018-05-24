import React, { Component } from "react";
import { Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
const levels = [
  { id: 5, color: "info" },
  { id: 4, color: "success" },
  { id: 3, color: "warning" },
  { id: 2, color: "warning" },
  { id: 1, color: "danger" }
];

const SUB = gql`
  subscription SimulatorsSub($id: ID) {
    simulatorsUpdate(simulatorId: $id) {
      id
      alertlevel
    }
  }
`;

class AlertConditionCore extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: { id: this.props.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.data.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  setAlert = number => {
    const mutation = gql`
      mutation AlertLevel($id: ID!, $level: String!) {
        changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $level)
      }
    `;
    const variables = {
      id: this.props.simulator.id,
      level: number
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      data: { loading, simulators }
    } = this.props;
    if (loading || !simulators) return null;
    const simulator = simulators[0];
    return (
      <div className="pull-right">
        {levels.map(l => (
          <Button
            className={
              simulator && simulator.alertlevel === l.id.toString()
                ? "active"
                : ""
            }
            key={`alert${l.id}`}
            color={l.color}
            onClick={() => this.setAlert(l.id)}
          >
            {l.id}
          </Button>
        ))}
      </div>
    );
  }
}
const QUERY = gql`
  query simulators($id: String) {
    simulators(id: $id) {
      id
      alertlevel
    }
  }
`;
export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      id: ownProps.simulator.id
    }
  })
})(AlertConditionCore);
