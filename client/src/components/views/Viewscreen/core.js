import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import VideoViewscreen from "./videoViewscreen";
import "./style.scss";

const fragment = gql`
  fragment ViewscreenViewData on Viewscreen {
    id
    name
    data
    auto
    component
    secondary
    overlay
  }
`;

const QUERY = gql`
  query Viewscreens($simulatorId: ID!) {
    viewscreens(simulatorId: $simulatorId) {
      ...ViewscreenViewData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription ViewscreensUpdate($simulatorId: ID!) {
    viewscreensUpdate(simulatorId: $simulatorId) {
      ...ViewscreenViewData
    }
  }
  ${fragment}
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
