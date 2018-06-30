import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ComputerCore from "./computerCore";
import "./style.scss";

const queryData = `
id
users {
  id
  name
  level
  hacker
  password
}
files {
  id
  name
  level
  corrupted
  restoring
}
virii {
  id
  name
}
terminals {
  id
  name
  status
}`;
const QUERY = gql`
  query ComputerCore($simulatorId: ID!) {
    computerCore(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription ComputerCoreUpdate($simulatorId: ID!) {
    computerCoreUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class ComputerCoreData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { computerCore } = data;
          if (loading || !computerCore) return null;
          if (!computerCore[0]) return <div>No Computer Core</div>;
          return (
            <ComputerCore
              {...this.props}
              {...computerCore[0]}
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      computerCore: subscriptionData.data.computerCoreUpdate
                    });
                  }
                })
              }
            />
          );
        }}
      </Query>
    );
  }
}
export default ComputerCoreData;
