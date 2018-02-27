import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

const SUB = gql``;

class Template extends Component {
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            template: subscriptionData.data.templateUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  render() {
    const { data: { loading, template } } = this.props;
    if (loading || !template) return null;
    return <div className="template-card">This is a template</div>;
  }
}

const QUERY = gql``;
export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Template));
