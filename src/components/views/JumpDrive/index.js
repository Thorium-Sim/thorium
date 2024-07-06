import { Query } from "@apollo/client";
import React, {Component} from "react";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import JumpDrive from "./jumpDrive";
import "./style.scss";

const fragment = gql`
  fragment JumpDriveData on JumpDrive {
    id
    name
    displayName
    power {
      power
      powerLevels
    }
    damage {
      damaged
    }
    stress
    sectors {
      aft {
        level
        offset
      }
      fore {
        level
        offset
      }
      port {
        level
        offset
      }
      starboard {
        level
        offset
      }
    }
    env
    activated
    enabled
    ringsExtended
  }
`;

export const JUMP_DRIVE_QUERY = gql`
  query JumpDrive($simulatorId: ID!) {
    jumpDrive(simulatorId: $simulatorId) {
      ...JumpDriveData
    }
  }
  ${fragment}
`;
export const JUMP_DRIVE_SUB = gql`
  subscription JumpDriveUpdate($simulatorId: ID!) {
    jumpDriveUpdate(simulatorId: $simulatorId) {
      ...JumpDriveData
    }
  }
  ${fragment}
`;

class JumpDriveData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={JUMP_DRIVE_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {jumpDrive} = data;
          if (!jumpDrive[0]) return <div>No Jump Drive</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: JUMP_DRIVE_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      jumpDrive: subscriptionData.data.jumpDriveUpdate,
                    });
                  },
                })
              }
            >
              <JumpDrive {...this.props} {...jumpDrive[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default JumpDriveData;
