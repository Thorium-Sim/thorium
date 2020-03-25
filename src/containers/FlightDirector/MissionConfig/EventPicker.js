import React from "react";
import gql from "graphql-tag.macro";
import {Query} from "react-apollo";

export const MacroConfigQuery = gql`
  query IntrospectionQuery {
    __schema {
      mutationType {
        name
        description
        fields {
          name
          description
        }
      }
    }
  }
`;

export const EventList = ({children}) => (
  <Query query={MacroConfigQuery}>
    {({loading, data}) => {
      if (loading || !data) return null;
      const {__schema} = data;
      const events = __schema.mutationType.fields
        .filter(mutation => {
          return mutation.description.substr(0, 5) === "Macro";
        })
        .map(type => {
          const description = type.description
            .replace("Macro: ", "")
            .split("\n")[0]
            .trim();
          const requirements = type.description
            .split("Requires:")[1]
            ?.split("-")
            .map(s => s.trim())
            .filter(Boolean);
          return {
            ...type,
            description,
            requirements,
          };
        })
        .sort((a, b) => {
          if (a.description > b.description) return 1;
          if (a.description < b.description) return -1;
          return 0;
        });
      return children(events);
    }}
  </Query>
);

const EventPicker = ({event = "nothing", handleChange, className}) => {
  return (
    <EventList>
      {events => (
        <select
          style={{width: "100%"}}
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
