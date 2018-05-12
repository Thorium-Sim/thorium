import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./style.css";

const queryData = `
id
history
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

class Core extends Component {
  componentDidMount() {
    this.sub = this.props.subscribe();
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  render() {
    const { history } = this.props;
    return (
      <div>
        <ul>{history.map((h, i) => <li key={`history-${i}`}>{h}</li>)}</ul>
      </div>
    );
  }
}

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
            <Core
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
