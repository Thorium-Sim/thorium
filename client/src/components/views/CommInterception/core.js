import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo, Mutation } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

const SUB = gql`
  subscription LRQueueingSub($simulatorId: ID) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      id
      interception
      difficulty
      locked
      decoded
    }
  }
`;

class LongRangeComm extends Component {
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
    const {
      data: { loading, longRangeCommunications }
    } = this.props;
    if (loading || !longRangeCommunications) return null;
    const lrComm = longRangeCommunications[0];
    if (!lrComm) return <p>No Long Range Comm</p>;
    const { interception, locked, decoded, difficulty } = lrComm;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  longRangeCommunications:
                    subscriptionData.data.longRangeCommunicationsUpdate
                });
              }
            })
          }
        />
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
        <div>
          <label>
            Difficulty: {(difficulty / 1000).toFixed(1)}s
            <Mutation
              mutation={gql`
                mutation Difficulty($id: ID!, $difficulty: Int!) {
                  setInterceptionDifficulty(id: $id, difficulty: $difficulty)
                }
              `}
            >
              {action => (
                <input
                  type="range"
                  min={30000}
                  max={120000}
                  defaultValue={difficulty}
                  onMouseUp={e =>
                    action({
                      variables: {
                        id: lrComm.id,
                        difficulty: parseInt(e.target.value, 10)
                      }
                    })
                  }
                />
              )}
            </Mutation>
          </label>
        </div>
      </div>
    );
  }
}
const QUEUING_QUERY = gql`
  query LRQueuing($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId) {
      id
      interception
      difficulty
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
