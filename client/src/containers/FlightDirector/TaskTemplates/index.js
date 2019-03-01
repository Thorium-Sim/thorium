import React from "react";
import gql from "graphql-tag.macro";
import { Query } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import TaskTemplates from "./taskTemplates";

const fragment = gql`
  fragment TaskTemplateData on TaskTemplate {
    id
    name
    definition
    values
    reportTypes
    macros {
      id
      event
      args
      delay
    }
  }
`;

const TASK_QUERY = gql`
  query TaskTemplates {
    taskTemplates {
      ...TaskTemplateData
    }
  }
  ${fragment}
`;
const SUB = gql`
  subscription TaskTemplatesUpdate {
    taskTemplatesUpdate {
      ...TaskTemplateData
    }
  }
  ${fragment}
`;
const TaskTemplatesData = props => {
  return (
    <Query query={TASK_QUERY}>
      {({ loading, data: { taskTemplates }, subscribeToMore }) =>
        loading || !taskTemplates ? null : (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: SUB,
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    taskTemplates: subscriptionData.data.taskTemplatesUpdate
                  });
                }
              })
            }
          >
            <TaskTemplates {...props} taskTemplates={taskTemplates} />
          </SubscriptionHelper>
        )
      }
    </Query>
  );
};
export default TaskTemplatesData;
