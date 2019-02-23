import React from "react";
import gql from "graphql-tag";
import { graphql, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";

const App = ({ data: { loading, interfaces }, selectedSimulator, client }) => {
  const updateInterfaces = (e, action) => {
    const variables = {
      simulatorId: selectedSimulator.id,
      interfaces: selectedSimulator.interfaces.concat(e.target.value)
    };
    action({
      variables
    });
  };
  const removeInterfaces = (id, action) => {
    const variables = {
      simulatorId: selectedSimulator.id,
      interfaces: (selectedSimulator.interfaces || []).filter(s => s !== id)
    };
    action({
      variables
    });
  };
  if (loading || !interfaces) return null;
  return (
    <Mutation
      mutation={gql`
        mutation UpdateSimulatorInterfaces(
          $simulatorId: ID!
          $interfaces: [ID]!
        ) {
          updateSimulatorInterfaces(
            simulatorId: $simulatorId
            interfaces: $interfaces
          )
        }
      `}
    >
      {action => (
        <div
          style={{ display: "flex", alignItems: "flex-start", height: "100%" }}
        >
          <select
            className="btn btn-primary"
            value={"nothing"}
            onChange={e => updateInterfaces(e, action)}
          >
            <option value="nothing">Add an interface to the simulator</option>
            {interfaces
              .filter(
                s => !(selectedSimulator.interfaces || []).find(c => c === s.id)
              )
              .map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
          <div>
            {(selectedSimulator.interfaces || []).map(s => {
              const interfaceObj = interfaces.find(c => c.id === s);
              if (!interfaceObj) return null;
              return (
                <p key={s}>
                  {" "}
                  <FontAwesome
                    className="text-danger"
                    name="ban"
                    onClick={() => removeInterfaces(s, action)}
                  />{" "}
                  {interfaceObj.name}{" "}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </Mutation>
  );
};

const QUERY = gql`
  query Interfaces {
    interfaces {
      id
      name
    }
  }
`;

export default graphql(QUERY)(App);
