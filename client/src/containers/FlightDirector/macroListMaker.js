import React from "react";
import { EventList } from "./MissionConfig/EventPicker";
import * as macros from "components/macros";
const MacroListMaker = ({ children, exceptions = [] }) => (
  <EventList>
    {events => {
      const eventList = events
        .filter(f => exceptions.indexOf(f.name) === -1)
        .reduce((prev, next) => {
          const Comp =
            macros[next.name] || (() => <div>No configuration.</div>);
          const Component = ({ value = {}, updateValue = () => {} }) => {
            return (
              <div
                className="macro-component"
                onMouseDown={e => e.stopPropagation()}
              >
                <strong>{next.description}</strong>
                <Comp
                  updateArgs={(key, val) =>
                    updateValue({ ...value, [key]: val })
                  }
                  args={value}
                />
              </div>
            );
          };
          return {
            ...prev,
            [`macro-${next.name}`]: {
              name: next.name,
              category: "Actions",
              willHide: true,
              inputs: [
                {
                  id: "trigger",
                  color: "orange",
                  title: "Triggers the action",
                  type: "Trigger"
                }
              ],
              config: [
                {
                  id: "delay",
                  title: "Delay",
                  props: {
                    type: "number",
                    placeholder: "Delay in milliseconds"
                  }
                }
              ],
              outputs: [],
              component: Component
            }
          };
        }, {});
      return children(eventList);
    }}
  </EventList>
);

export default MacroListMaker;
