import { Query } from "@apollo/client";
import React, {Component} from "react";
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

export const VIEWSCREEN_CORE_QUERY = gql`
  query Viewscreens($simulatorId: ID!) {
    viewscreens(simulatorId: $simulatorId) {
      ...ViewscreenViewData
    }
  }
  ${fragment}
`;
export const VIEWSCREEN_CORE_SUB = gql`
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
      <Query
        query={VIEWSCREEN_CORE_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {viewscreens} = data;
          if (viewscreens.length === 0) return <div>No Viewscreens</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: VIEWSCREEN_CORE_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      viewscreens: subscriptionData.data.viewscreensUpdate,
                    });
                  },
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
