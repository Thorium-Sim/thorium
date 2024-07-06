import { Query } from "@apollo/client";
import React, {Component} from "react";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import DamageControl from "./damageControl";
import "./style.scss";

const fragments = {
  systemData: gql`
    fragment SystemData on System {
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
    }
  `,
  taskReportData: gql`
    fragment TaskReportData on TaskReport {
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
      }
    }
  `,
};
export const DAMAGE_REPORT_QUERY = gql`
  query Systems($simulatorId: ID!, $which: String) {
    simulators(id: $simulatorId) {
      id
      stepDamage
      verifyStep
    }
    systems(simulatorId: $simulatorId, extra: true, damageWhich: $which) {
      ...SystemData
    }
    taskReport(simulatorId: $simulatorId, type: $which) {
      ...TaskReportData
    }
  }
  ${fragments.systemData}
  ${fragments.taskReportData}
`;
export const DAMAGE_SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID!, $which: String) {
    systemsUpdate(simulatorId: $simulatorId, extra: true, damageWhich: $which) {
      ...SystemData
    }
  }
  ${fragments.systemData}
`;

export const DAMAGE_TASK_REPORT_SUB = gql`
  subscription TaskReports($simulatorId: ID!, $which: String) {
    taskReportUpdate(simulatorId: $simulatorId, type: $which) {
      ...TaskReportData
    }
  }
  ${fragments.taskReportData}
`;

class DamageControlData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={DAMAGE_REPORT_QUERY}
        variables={{
          simulatorId: this.props.simulator.id,
          which: this.props.which || "default",
        }}
      >
        {({loading, data, error, subscribeToMore}) => {
          if (loading || !data) return null;
          const {systems, simulators, taskReport} = data;
          const [simulator] = simulators;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: DAMAGE_SYSTEMS_SUB,
                  variables: {
                    simulatorId: this.props.simulator.id,
                    which: this.props.which || "default",
                  },
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      systems: subscriptionData.data.systemsUpdate,
                    });
                  },
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: DAMAGE_TASK_REPORT_SUB,
                    variables: {
                      simulatorId: this.props.simulator.id,
                      which: this.props.which || "default",
                    },
                    updateQuery: (previousResult, {subscriptionData}) => {
                      return Object.assign({}, previousResult, {
                        taskReport: subscriptionData.data.taskReportUpdate,
                      });
                    },
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
