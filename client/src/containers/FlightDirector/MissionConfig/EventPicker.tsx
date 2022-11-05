import React from "react";
import {IntrospectionQueryDocument, __Schema} from "generated/graphql";
import {useApolloClient} from "@apollo/client";

interface Event {
  name: string;
  description: string;
  requirements: string[];
}
let eventsCache: Event[] = [];
export function useEventNames(): Event[] {
  const [events, setEvents] = React.useState<Event[]>(eventsCache);
  const client = useApolloClient();
  React.useEffect(() => {
    async function getEvents() {
      const {data} = await client.query({query: IntrospectionQueryDocument});
      const schema: __Schema = data.__schema;
      const events =
        schema.mutationType?.fields
          ?.filter(mutation => {
            return mutation?.description?.substr(0, 5) === "Macro";
          })
          .map(type => {
            const description = type?.description
              ?.replace("Macro: ", "")
              .split("\n")[0]
              .trim();
            const requirements = type?.description
              ?.split("Requires:")[1]
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
            if (!a.description || !b.description) return 0;
            if (a.description > b.description) return 1;
            if (a.description < b.description) return -1;
            return 0;
          }) || [];
      eventsCache = events as Event[];
      setEvents(events as Event[]);
    }
    if (events.length > 0) return;
    getEvents();
  }, [client, events.length]);

  return events;
}

export const EventList = ({children}: {children: Function}) => {
  const events = useEventNames();
  return children(events);
};

interface EventPickerProps {
  event?: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const EventPicker: React.FC<EventPickerProps> = ({
  event = "nothing",
  handleChange,
  className,
}) => {
  const events = useEventNames();
  const eventOptions = events.reduce(
    (prev: {[key: string]: typeof events}, next) => {
      const category = next.description.split(":")[0];
      const type = {
        ...next,
        description:
          next.description.split(":")[1] || next.description.split(":")[0],
      };
      prev[category] = prev[category] ? prev[category].concat(type) : [type];
      return prev;
    },
    {},
  );
  return (
    <select
      style={{width: "100%"}}
      value={event || ""}
      onChange={handleChange}
      name="mutations"
      className={className || `c-select form-control`}
    >
      <option>Select an event</option>
      {Object.entries(eventOptions).map(([key, value]) => (
        <optgroup key={key} label={key}>
          {value.map(type => {
            return (
              <option key={type.name} value={type.name}>
                {type.description}
              </option>
            );
          })}
        </optgroup>
      ))}
    </select>
  );
};

export default EventPicker;
