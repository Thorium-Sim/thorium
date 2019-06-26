import React, { Component } from "react";
import { Query } from "react-apollo";
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

const QUERY = gql`
  query JumpDrive($simulatorId: ID!) {
    jumpDrive(simulatorId: $simulatorId) {
      ...JumpDriveData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
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
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { jumpDrive } = data;
          if (loading || !jumpDrive) return null;
          if (!jumpDrive[0]) return <div>No Jump Drive</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      jumpDrive: subscriptionData.data.jumpDriveUpdate
                    });
                  }
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
