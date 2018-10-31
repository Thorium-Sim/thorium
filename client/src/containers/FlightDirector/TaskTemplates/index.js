import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import TaskTemplates from "./taskTemplates";

const queryData = `
id
name
definition
values`;

const TASKQUERY = gql`query TaskTemplates{
  taskTemplates {
   ${queryData}
  }
}`;
const SUB = gql`
subscription TaskTemplatesUpdate {
  taskTemplatesUpdate {
    ${queryData}
  }
}`;
const TaskTemplatesData = props => {
  return (
    <Query query={TASKQUERY}>
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
