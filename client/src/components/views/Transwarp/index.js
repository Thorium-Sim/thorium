import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Transwarp from "./transwarp";
import "./style.scss";

const coreData = `
core {
  required
  value
}
warp {
  required
  value
}
field {
  required
  value
}`;

const queryData = `
id
quad1 {
  ${coreData}
}
quad2 {
  ${coreData}
}
quad3 {
  ${coreData}
}
quad4 {
  ${coreData}
}
active
power {
  power
  powerLevels
}
damage {
  damaged
}
`;

const QUERY = gql`
  query Transwarp($simulatorId: ID!) {
    transwarp(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription TranswarpUpdate($simulatorId: ID!) {
    transwarpUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class TranswarpData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { transwarp } = data;
          if (loading || !transwarp) return null;
          if (!transwarp[0]) return <div>No Transwarp</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      transwarp: subscriptionData.data.transwarpUpdate
                    });
                  }
                })
              }
            >
              <Transwarp {...this.props} {...transwarp[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TranswarpData;
