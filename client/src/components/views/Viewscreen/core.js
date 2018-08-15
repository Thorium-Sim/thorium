import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import VideoViewscreen from "./videoViewscreen";
import "./style.scss";

const queryData = `
id
name
data
auto
component
secondary
`;

const QUERY = gql`
  query Viewscreens($simulatorId: ID!) {
    viewscreens(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription ViewscreensUpdate($simulatorId: ID!) {
    viewscreensUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class TemplateData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { viewscreens } = data;
          if (loading || !viewscreens) return null;
          if (viewscreens.length === 0) return <div>No Viewscreens</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      viewscreens: subscriptionData.data.viewscreensUpdate
                    });
                  }
                })
              }
            >
              <VideoViewscreen {...this.props} viewscreens={viewscreens} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TemplateData;
