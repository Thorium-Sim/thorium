import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

const SUB = gql`
  subscription LRQueueingSub($simulatorId: ID) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      id
      interception
      locked
      decoded
    }
  }
`;

class LongRangeComm extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            longRangeCommunications:
              subscriptionData.data.longRangeCommunicationsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  toggleInterception = e => {
    const { data } = this.props;
    const longRangeCommunications = data.longRangeCommunications[0];
    const mutation = gql`
      mutation UpdateLRC($longRange: LongRangeCommInput!) {
        updateLongRangeComm(longRangeComm: $longRange)
      }
    `;
    const variables = {
      longRange: {
        id: longRangeCommunications.id,
        interception: e.target.checked
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { data: { loading, longRangeCommunications } } = this.props;
    if (loading || !longRangeCommunications) return null;
    const lrComm = longRangeCommunications[0];
    if (!lrComm) return <p>No Long Range Comm</p>;
    const { interception, locked, decoded } = lrComm;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={interception}
            onChange={this.toggleInterception}
          />{" "}
          Interception
        </label>{" "}
        <label>
          <input type="checkbox" checked={locked} disabled /> Locked
        </label>{" "}
        <label>
          <input type="checkbox" checked={decoded} disabled /> Decoded
        </label>
      </div>
    );
  }
}
const QUEUING_QUERY = gql`
  query LRQueuing($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId) {
      id
      interception
      locked
      decoded
    }
  }
`;
export default graphql(QUEUING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(LongRangeComm));
