import React from "react";
import gql from "graphql-tag.macro";
import { Query } from "react-apollo";

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

export const EventList = ({ children }) => (
  <Query query={MacroConfigQuery}>
    {({ loading, data: { __schema } }) => {
      if (loading || !__schema) return null;
      const events = __schema.mutationType.fields
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
        });
      return children(events);
    }}
  </Query>
);

const EventPicker = ({ event, handleChange, className }) => {
  return (
    <EventList>
      {events => (
        <select
          style={{ width: "100%" }}
          value={event || ""}
          onChange={handleChange}
          name="mutations"
          className={className || `c-select form-control`}
        >
          <option>Select an event</option>
          {events.map(type => {
            return (
              <option key={type.name} value={type.name}>
                {type.description}
              </option>
            );
          })}
        </select>
      )}
    </EventList>
  );
};

export default EventPicker;
