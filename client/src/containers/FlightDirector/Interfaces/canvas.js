import React from "react";
import { Mutation } from "react-apollo";
import { Col, Input } from "reactstrap";
import gql from "graphql-tag.macro";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config
} from "helpers/react-node-diagrams";
import * as components from "./components";
import debounce from "helpers/debounce";
import MacroListMaker from "../macroListMaker";

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
        <MacroListMaker>
          {eventList => (
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
                          interfaceObj.deviceType && interfaceObj.deviceType.id
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
              <Col
                sm={6}
                style={{ height: "100%" }}
                onContextMenu={e => e.preventDefault()}
              >
                {" "}
                <Canvas />
              </Col>
            </DiagramProvider>
          )}
        </MacroListMaker>
      )}
    </Mutation>
  );
};

export default InterfaceCanvas;
