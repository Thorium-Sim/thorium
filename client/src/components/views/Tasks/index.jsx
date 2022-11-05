import React, {Component} from "react";
import {Query} from "@apollo/client/react/components";
import gql from "graphql-tag";
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
    timeElapsedInMS
    station
  }
`;

export const TASK_QUERY = gql`
  query Tasks($simulatorId: ID!, $station: String) {
    tasks(simulatorId: $simulatorId, station: $station) {
      ...TaskData
    }
  }
  ${fragment}
`;
export const TASK_SUB = gql`
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
        query={TASK_QUERY}
        variables={{
          simulatorId: this.props.simulator.id,
          station: this.props.station.executive
            ? null
            : this.props.station.name,
        }}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {tasks} = data;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: TASK_SUB,
                  variables: {
                    simulatorId: this.props.simulator.id,
                    station: this.props.station.executive
                      ? null
                      : this.props.station.name,
                  },
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      tasks: subscriptionData.data.tasksUpdate,
                    });
                  },
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
