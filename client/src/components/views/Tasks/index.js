import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Tasks from "./tasks";
import "./style.scss";

const fragment = gql`
  fragment TaskData on Task {
    id
    instructions
    verified
    dismissed
    values
    definition
    verifyRequested
  }
`;

const QUERY = gql`
  query Tasks($simulatorId: ID!, $station: String) {
    tasks(simulatorId: $simulatorId, station: $station) {
      ...TaskData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription TasksUpdate($simulatorId: ID!, $station: String) {
    tasksUpdate(simulatorId: $simulatorId, station: $station) {
      ...TaskData
    }
  }
  ${fragment}
`;

class TasksData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={QUERY}
        variables={{
          simulatorId: this.props.simulator.id,
          station: this.props.station.name
        }}
      >
        {({ loading, data, subscribeToMore }) => {
          const { tasks } = data;
          if (loading || !tasks) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: {
                    simulatorId: this.props.simulator.id,
                    station: this.props.station.name
                  },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      tasks: subscriptionData.data.tasksUpdate
                    });
                  }
                })
              }
            >
              <Tasks {...this.props} tasks={tasks} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TasksData;
