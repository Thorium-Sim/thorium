import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import * as ViewscreenCards from "../../viewscreens";

import "./style.scss";

const VIEWSCREEN_SUB = gql`
  subscription ViewscreenSub($simulatorId: ID) {
    viewscreensUpdate(simulatorId: $simulatorId) {
      id
      name
      component
      data
    }
  }
`;

export class Viewscreen extends Component {
  sub = null;
  keydown = e => {
    const variables = {
      simulatorId: this.props.simulator.id
    };
    const mutation = gql`
      mutation AutoAdvance($simulatorId: ID!, $prev: Boolean) {
        autoAdvance(simulatorId: $simulatorId, prev: $prev)
      }
    `;
    if (e.which === 39) {
      this.props.client.mutate({
        mutation,
        variables
      });
    }
    if (e.which === 37) {
      variables.prev = true;
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.keydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
    this.sub && this.sub();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && !this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: VIEWSCREEN_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            viewscreens: subscriptionData.data.viewscreensUpdate
          });
        }
      });
    }
  }
  render() {
    if (this.props.component) {
      const ViewscreenComponent = ViewscreenCards[this.props.component];
      return <ViewscreenComponent {...this.props} />;
    }
    const {
      data: { loading, viewscreens },
      clientObj
    } = this.props;
    if (loading || !viewscreens) return null;
    const viewscreen = viewscreens.find(v => v.id === clientObj.id);
    if (!viewscreen) return <div>No Viewscreen</div>;
    if (ViewscreenCards[viewscreen.component]) {
      const ViewscreenComponent = ViewscreenCards[viewscreen.component];
      return <ViewscreenComponent {...this.props} viewscreen={viewscreen} />;
    }
    if (!viewscreen) {
      return <div>No Viewscreen Component for {viewscreen.component}</div>;
    }
  }
}

const VIEWSCREEN_QUERY = gql`
  query Viewscreens($simulatorId: ID) {
    viewscreens(simulatorId: $simulatorId) {
      id
      name
      component
      data
    }
  }
`;
export default graphql(VIEWSCREEN_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Viewscreen));
