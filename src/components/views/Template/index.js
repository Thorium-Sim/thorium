import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.scss";

const TEMPLATE_SUB = gql``;

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
            template: subscriptionData.data.templateUpdate
          });
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    return <div className="template-card">This is a template</div>;
  }
}

const TEMPLATE_QUERY = gql`
`;
export default graphql(TEMPLATE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Template));
