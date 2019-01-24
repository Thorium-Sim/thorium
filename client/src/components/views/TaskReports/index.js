import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Template from "./template";
import "./style.scss";

const queryData = `
`;

const QUERY = gql`
  query Template($simulatorId: ID!) {
    template(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    templateUpdate(simulatorId: $simulatorId) {
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
          const { template } = data;
          if (loading || !template) return null;
          if (!template[0]) return <div>No Template</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      template: subscriptionData.data.templateUpdate
                    });
                  }
                })
              }
            >
              <Template {...this.props} {...template[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TemplateData;
