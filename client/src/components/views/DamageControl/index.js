import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import DamageControl from "./damageControl";
import "./style.scss";

const queryData = `
id
displayName
name
damage {
  damaged
  destroyed
  report
  requested
  reactivationCode
  neededReactivationCode
  currentStep
  validate
  which
}
simulatorId
type
`;

const taskReportData = `
id
name
tasks {
  id
  verified
  instructions
  verifyRequested
  station
  assigned
}
system {
  id
  name
  displayName
  damage {
    damaged
    destroyed
    report
    requested
    reactivationCode
    neededReactivationCode
    currentStep
    validate
    which
  }
}`;
const QUERY = gql`
  query Systems($simulatorId: ID!, $simId: String, $which:String) {
    simulators(id: $simId) {
      id
      stepDamage
      verifyStep
    }
    systems(simulatorId: $simulatorId, extra:true, damageWhich:$which) {
${queryData}
    }
    taskReport(simulatorId:$simulatorId, type:$which) {
     ${taskReportData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription SystemsUpdate($simulatorId: ID!, $which: String) {
    systemsUpdate(simulatorId: $simulatorId, extra: true, damageWhich: $which) {
${queryData}
    }
  }
`;

const TASK_REPORT_SUB = gql`
  subscription TaskReports($simulatorId: ID!, $which: String) {
    taskReportUpdate(simulatorId: $simulatorId, type: $which) {
${taskReportData}
    }
  }
`;

class DamageControlData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={QUERY}
        variables={{
          simulatorId: this.props.simulator.id,
          simId: this.props.simulator.id,
          which: this.props.which || "default"
        }}
      >
        {({ loading, data, subscribeToMore }) => {
          const { systems, simulators, taskReport } = data;
          if (loading || !systems || !simulators) return null;
          const [simulator] = simulators;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: {
                    simulatorId: this.props.simulator.id,
                    which: this.props.which || "default"
                  },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      systems: subscriptionData.data.systemsUpdate
                    });
                  }
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: TASK_REPORT_SUB,
                    variables: {
                      simulatorId: this.props.simulator.id,
                      which: this.props.which || "default"
                    },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        taskReport: subscriptionData.data.taskReportUpdate
                      });
                    }
                  })
                }
              />
              <DamageControl
                {...this.props}
                systems={systems}
                {...simulator}
                taskReports={taskReport}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default DamageControlData;
