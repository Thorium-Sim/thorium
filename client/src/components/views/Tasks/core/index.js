import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import TaskCreator from "./TaskCreator";
import TasksManager from "./TasksManager";
import "./style.scss";

const queryData = `
id
verified
dismissed
instructions
station
definition
verifyRequested
`;

const templateQueryData = `
id
name
definition
values`;

const QUERY = gql`
  query Tasks($simulatorId: ID!) {
    tasks(simulatorId: $simulatorId) {
${queryData}
    }
    taskTemplates {
   ${templateQueryData}
  }
  }
`;
const SUBSCRIPTION = gql`
  subscription TasksUpdate($simulatorId: ID!) {
    tasksUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const TEMPLATE_SUB = gql`
subscription TaskTemplatesUpdate {
  taskTemplatesUpdate {
    ${templateQueryData}
  }
}`;
class TasksCore extends Component {
  state = {};
  render() {
    const { newTask } = this.state;
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { tasks, taskTemplates } = data;
          if (loading || !tasks) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      tasks: subscriptionData.data.tasksUpdate
                    });
                  }
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: TEMPLATE_SUB,
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        taskTemplates: subscriptionData.data.taskTemplatesUpdate
                      });
                    }
                  })
                }
              />
              {newTask ? (
                <TaskCreator
                  {...this.props}
                  taskTemplates={taskTemplates}
                  cancel={() => this.setState({ newTask: false })}
                />
              ) : (
                <TasksManager
                  {...this.props}
                  tasks={tasks}
                  newTask={() => this.setState({ newTask: true })}
                />
              )}
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TasksCore;
