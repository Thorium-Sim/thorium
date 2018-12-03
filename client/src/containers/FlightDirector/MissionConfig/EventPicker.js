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
        .map(type => ({
          ...type,
          description: type.description.replace("Macro: ", "")
        }))
        .sort((a, b) => {
          if (a.description > b.description) return 1;
          if (a.description < b.description) return -1;
          return 0;
        })
        .map(type => {
          return (
            <option key={type.name} value={type.name}>
              {type.description}
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
