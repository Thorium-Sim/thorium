import React, { useState } from "react";
import { Mutation, withApollo } from "react-apollo";
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
import { DEVICE_QUERY } from "./";
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

const InterfaceCanvas = ({ interfaceObj, interfaceDevices, client }) => {
  const [snapping, setSnapping] = useState(false);
  if (!interfaceObj) return null;
  const handleChange = ({ update }) => e => {
    if (e.target.value === "create") {
      const mutation = gql`
        mutation CreateInterfaceDevice(
          $name: String!
          $width: Int!
          $height: Int!
        ) {
          addInterfaceDevice(name: $name, width: $width, height: $height)
        }
      `;
      const name = prompt("What is the name of the new interface device?");
      if (!name) return;
      const dims = prompt(
        'What are the dimensions of the new interface device? (eg. "320x480")',
        "320x480"
      );
      const splitDims = dims.split("x");
      const width = parseInt(splitDims[0], 10);
      const height = parseInt(splitDims[1], 10);
      if (!width || !height) return;
      const variables = {
        name,
        width,
        height
      };
      return client
        .mutate({
          mutation,
          variables,
          refetchQueries: [{ query: DEVICE_QUERY }]
        })
        .then(({ data: { addInterfaceDevice } }) => {
          update({
            variables: {
              id: interfaceObj.id,
              deviceType: addInterfaceDevice
            }
          });
        });
    }
    if (e.target.value === "delete") {
      const mutation = gql`
        mutation RemoveDevice($id: ID!) {
          removeInterfaceDevice(id: $id)
        }
      `;
      if (
        !window.confirm(
          "Are you sure you want to remove this device? Any interfaces that use this device will default to the size of the screen they are shown on."
        )
      );
      const variables = {
        id: interfaceObj.deviceType && interfaceObj.deviceType.id
      };
      return client.mutate({
        mutation,
        variables,
        refetchQueries: [{ query: DEVICE_QUERY }]
      });
    }
    if (e.target.value === "rename") {
      const mutation = gql`
        mutation RenameDevice($id: ID!, $name: String!) {
          renameInterfaceDevice(id: $id, name: $name)
        }
      `;
      const name = prompt(
        "What is the new name of the interface device?",
        interfaceObj.deviceType && interfaceObj.deviceType.name
      );
      if (!name) return;
      const variables = {
        id: interfaceObj.deviceType && interfaceObj.deviceType.id,
        name
      };
      return client.mutate({
        mutation,
        variables,
        refetchQueries: [{ query: DEVICE_QUERY }]
      });
    }
    update({
      variables: {
        id: interfaceObj.id,
        deviceType: e.target.value
      }
    });
  };
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
                        onChange={handleChange({ update: action })}
                      >
                        <option value={null}>
                          Scale To Device Screen Size
                        </option>
                        {interfaceDevices.map(i => (
                          <option key={i.id} value={i.id}>
                            {i.name} - {i.width}×{i.height}
                          </option>
                        ))}
                        <option disabled>----------</option>
                        <option value="create">Create New Device Type</option>
                        <option
                          value="rename"
                          disabled={!interfaceObj.deviceType}
                        >
                          Rename Device Type
                        </option>
                        <option
                          value="delete"
                          disabled={!interfaceObj.deviceType}
                        >
                          Delete Device Type
                        </option>
                      </Input>
                    )}
                  </Mutation>
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={e => setSnapping(e.target.checked)}
                    checked={snapping}
                  />{" "}
                  Snap to Grid
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
                <Canvas snapping={snapping} />
              </Col>
            </DiagramProvider>
          )}
        </MacroListMaker>
      )}
    </Mutation>
  );
};

export default withApollo(InterfaceCanvas);
