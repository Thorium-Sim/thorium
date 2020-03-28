import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Thx from "./thx";
import "./style.scss";

const fragment = gql`
  fragment THXDeviceData on Thx {
    id
    name
    clients {
      id
      lock
      charge
      station {
        name
      }
      executive
    }
    activated
  }
`;

export const THX_QUERY = gql`
  query Thx($simulatorId: ID!) {
    thx(simulatorId: $simulatorId) {
      ...THXDeviceData
    }
  }
  ${fragment}
`;
export const THX_SUB = gql`
  subscription ThxUpdate($simulatorId: ID!) {
    thxUpdate(simulatorId: $simulatorId) {
      ...THXDeviceData
    }
  }
  ${fragment}
`;

class ThxData extends Component {
  static hypercard = true;
  state = {};
  render() {
    return (
      <Query
        query={THX_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {thx} = data;
          if (!thx[0]) return <div>No Thx</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: THX_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      thx: subscriptionData.data.thxUpdate,
                    });
                  },
                })
              }
            >
              <Thx {...this.props} {...thx[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default ThxData;
