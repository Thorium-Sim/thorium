import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.css";

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

const TemplateCore = () => <div className="template-core">Hello World!</div>;

const TemplateData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { template } = data;
      if (loading || !template) return null;
      if (!template[0]) return <div>No Template</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  template: subscriptionData.data.templateUpdate
                });
              }
            })
          }
        >
          <TemplateCore {...props} {...template[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default TemplateData;
