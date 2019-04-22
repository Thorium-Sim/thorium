import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import TaskCreator from "./TaskCreator";
import TasksManager from "./TasksManager";
import "./style.scss";
import Statistics from "./Statistics";

const fragments = {
  taskFragment: gql`
    fragment TaskCoreData on Task {
      id
      verified
      dismissed
      instructions
      station
      definition
      verifyRequested
      startTime
      endTime
    }
  `,
  taskTemplateFragment: gql`
    fragment TaskTemplateCoreData on TaskTemplate {
      id
      name
      definition
      values
      macros {
        id
        args
        event
        delay
      }
    }
  `
};

const QUERY = gql`
  query Tasks($simulatorId: ID!) {
    tasks(simulatorId: $simulatorId) {
      ...TaskCoreData
    }
    taskTemplates {
      ...TaskTemplateCoreData
    }
  }
  ${fragments.taskFragment}
  ${fragments.taskTemplateFragment}
`;
const SUBSCRIPTION = gql`
  subscription TasksUpdate($simulatorId: ID!) {
    tasksUpdate(simulatorId: $simulatorId) {
      ...TaskCoreData
    }
  }
  ${fragments.taskFragment}
`;

const TEMPLATE_SUB = gql`
  subscription TaskTemplatesUpdate {
    taskTemplatesUpdate {
      ...TaskTemplateCoreData
    }
  }
  ${fragments.taskTemplateFragment}
`;

class RenderPage extends Component {
  state = {};
  render() {
    const { taskTemplates, tasks } = this.props;
    const { newTask, stats } = this.state;

    if (newTask)
      return (
        <TaskCreator
          {...this.props}
          taskTemplates={taskTemplates}
          cancel={() => this.setState({ newTask: false })}
        />
      );
    if (stats)
      return (
        <Statistics
          tasks={tasks}
          cancel={() => this.setState({ newTask: false, stats: false })}
        />
      );
    return (
      <TasksManager
        {...this.props}
        tasks={tasks}
        newTask={() => this.setState({ newTask: true })}
        stats={() => this.setState({ stats: true })}
      />
    );
  }
}
class TasksCore extends Component {
  state = {};
  render() {
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
              <RenderPage
                {...this.props}
                taskTemplates={taskTemplates}
                tasks={tasks}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TasksCore;
