import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const EventPicker = ({
  data: { __schema, loading },
  event,
  handleChange,
  className
}) => {
  if (loading || !__schema) return null;
  const events = __schema.mutationType.fields;
  return (
    <select
      value={event || ""}
      onChange={handleChange}
      name="mutations"
      className={className || `c-select form-control`}
    >
      <option>Select an event</option>
      {events
        .filter(mutation => {
          return mutation.description.substr(0, 5) === "Macro";
        })
        .map(type => {
          return (
            <option key={type.name} value={type.name}>
              {type.description.replace("Macro: ", "")}
            </option>
          );
        })}
    </select>
  );
};

const MacroConfigQuery = gql`
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
`;

export default graphql(MacroConfigQuery, {})(EventPicker);
