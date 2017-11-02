import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

const TEMPLATE_SUB = gql`
  subscription ClientsUpdate($simulatorId: ID) {
    clientChanged(simulatorId: $simulatorId) {
      id
      station {
        name
      }
      loginName
    }
  }
`;

class Template extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: TEMPLATE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            clients: subscriptionData.clientChanged
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
  render() {
    if (this.props.data.loading) return null;
    const { clients } = this.props.data;
    return (
      <div className="clients-card">
        <ul>
          {clients.map(c => (
            <li key={c.id}>
              {`${c.station ? c.station.name : ""} - ${c.loginName || ""}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const TEMPLATE_QUERY = gql`
  query Clients($simulatorId: ID) {
    clients(simulatorId: $simulatorId) {
      id
      station {
        name
      }
      loginName
    }
  }
`;
export default graphql(TEMPLATE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Template));
