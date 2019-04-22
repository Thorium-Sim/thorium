import React from "react";
import gql from "graphql-tag.macro";
import { Query } from "react-apollo";

const memo = {};
const EventName = ({ id, label }) => {
  if (memo[id]) return memo[id];
  return (
    <Query
      query={gql`
        query IntrospectionQuery {
          __schema {
            mutationType {
              name
              description
              fields {
                name
                description
                isDeprecated
                deprecationReason
                args {
                  name
                  description
                  defaultValue
                }
              }
            }
          }
        }
      `}
    >
      {({ loading, data }) => {
        if (loading) return label || id;
        const name = data.__schema.mutationType.fields
          .find(f => f.name === id)
          .description.replace("Macro: ", "");
        memo[id] = name;
        return name;
      }}
    </Query>
  );
};

export default EventName;
