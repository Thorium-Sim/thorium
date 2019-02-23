import React from "react";
import { Mutation } from "react-apollo";
import { Col, Input } from "reactstrap";
import gql from "graphql-tag";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config
} from "react-node-diagrams";
import * as components from "./components";
import debounce from "helpers/debounce";
import { EventList } from "../MissionConfig/EventPicker";
import * as macros from "components/macros";
// I'm lazy
const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const updateComponents = debounce(
  (action, interfaceObj, { components, connections, config, values }) => {
    const variables = { id: interfaceObj.id };
    if (!compare(components, interfaceObj.components))
      variables.components = components.filter(
        c => c.id !== "screen-component"
      );
    if (!compare(connections, interfaceObj.connections))
      variables.connections = connections;
    if (!compare(config, interfaceObj.config)) variables.config = config;
    if (!compare(values, interfaceObj.values)) variables.values = values;
    action({ variables });
  },
  2500
);

const InterfaceCanvas = ({ interfaceObj, interfaceDevices }) => {
  console.log(interfaceObj);
  if (!interfaceObj) return null;
  return (
    <Mutation
      key={interfaceObj.id}
      mutation={gql`
        mutation UpdateInterface(
          $id: ID!
          $components: JSON
          $connections: JSON
          $config: JSON
          $values: JSON
        ) {
          updateInterface(
            id: $id
            components: $components
            connections: $connections
            config: $config
            values: $values
          )
        }
      `}
    >
      {action => (
        <EventList>
          {events => {
            const eventList = events.reduce((prev, next) => {
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
                [next.name]: {
                  name: next.description,
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
            return (
              <DiagramProvider
                key={interfaceObj.deviceType && interfaceObj.deviceType.id}
                {...interfaceObj}
                components={[
                  {
                    component: { name: "Screen" },
                    id: "screen-component",
                    position: {
                      x: 0,
                      y: 0
                    }
                  },
                  ...interfaceObj.components
                ]}
                values={{
                  ...interfaceObj.values,
                  "screen-component": {
                    width: interfaceObj.deviceType
                      ? interfaceObj.deviceType.width
                      : 320,
                    height: interfaceObj.deviceType
                      ? interfaceObj.deviceType.height
                      : 568
                  }
                }}
                registeredComponents={{ ...components, ...eventList }}
                onUpdate={data => updateComponents(action, interfaceObj, data)}
              >
                <Col
                  sm={3}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <label>
                    Device Types
                    <Mutation
                      mutation={gql`
                        mutation UpdateDeviceType($id: ID!, $deviceType: ID!) {
                          updateInterface(id: $id, deviceType: $deviceType)
                        }
                      `}
                    >
                      {action => (
                        <Input
                          type="select"
                          value={
                            interfaceObj.deviceType &&
                            interfaceObj.deviceType.id
                          }
                          onChange={e =>
                            action({
                              variables: {
                                id: interfaceObj.id,
                                deviceType: e.target.value
                              }
                            })
                          }
                        >
                          {interfaceDevices.map(i => (
                            <option key={i.id} value={i.id}>
                              {i.name} - {i.width}×{i.height}
                            </option>
                          ))}
                        </Input>
                      )}
                    </Mutation>
                  </label>
                  <DiagramContext.Consumer>
                    {({ selectedComponent }) =>
                      selectedComponent ? <Config /> : <Library />
                    }
                  </DiagramContext.Consumer>
                </Col>
                <Col sm={6} style={{ height: "100%" }}>
                  {" "}
                  <Canvas />
                </Col>
              </DiagramProvider>
            );
          }}
        </EventList>
      )}
    </Mutation>
  );
};

export default InterfaceCanvas;
