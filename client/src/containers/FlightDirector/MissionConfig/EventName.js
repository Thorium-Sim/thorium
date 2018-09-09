import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const EventName = ({ id, label }) => {
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
        return data.__schema.mutationType.fields
          .find(f => f.name === id)
          .description.replace("Macro: ", "");
      }}
    </Query>
  );
};

export default EventName;
