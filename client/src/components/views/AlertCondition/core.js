import React, { Component } from "react";
import { Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, Mutation } from "react-apollo";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
const levels = [
  { id: 5, color: "info" },
  { id: 4, color: "success" },
  { id: 3, color: { background: "#B1B100", color: "white" } },
  { id: 2, color: { background: "orange", color: "white" } },
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
  render() {
    const {
      data: { loading, simulators }
    } = this.props;
    if (loading || !simulators) return null;
    const simulator = simulators[0];
    return (
      <div className="pull-right">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: { id: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        <Mutation
          mutation={gql`
            mutation AlertLevel($id: ID!, $level: String!) {
              changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $level)
            }
          `}
        >
          {action =>
            levels.map(l => (
              <Button
                className={
                  simulator && simulator.alertlevel === l.id.toString()
                    ? "active"
                    : ""
                }
                key={`alert${l.id}`}
                color={typeof l.color === "string" ? l.color : null}
                style={typeof l.color === "object" ? l.color : null}
                onClick={() =>
                  action({
                    variables: { id: this.props.simulator.id, level: l.id }
                  })
                }
              >
                {l.id}
              </Button>
            ))
          }
        </Mutation>
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
