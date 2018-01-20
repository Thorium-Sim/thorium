import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

const TEMPLATE_SUB = gql``;

class Template extends Component {
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TEMPLATE_SUB,
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
    if (this.props.data.loading || !this.props.data.template) return null;
    return <div className="template-card">This is a template</div>;
  }
}

const TEMPLATE_QUERY = gql``;
export default graphql(TEMPLATE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Template));
