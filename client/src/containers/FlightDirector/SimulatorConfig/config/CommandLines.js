import React from "react";
import gql from "graphql-tag.macro";
import { graphql, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";

const App = ({ data: { loading, commandLine }, selectedSimulator, client }) => {
  const updateCommandLines = (e, action) => {
    const variables = {
      simulatorId: selectedSimulator.id,
      commandLines: selectedSimulator.commandLines.concat(e.target.value)
    };
    action({
      variables
    });
  };
  const removeCommandLine = (id, action) => {
    const variables = {
      simulatorId: selectedSimulator.id,
      commandLines: (selectedSimulator.commandLines || []).filter(s => s !== id)
    };
    action({
      variables
    });
  };
  if (loading || !commandLine) return null;
  return (
    <Mutation
      mutation={gql`
        mutation UpdateSimulatorCommandLines(
          $simulatorId: ID!
          $commandLines: [ID]!
        ) {
          updateSimulatorCommandLines(
            simulatorId: $simulatorId
            commandLines: $commandLines
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
            onChange={e => updateCommandLines(e, action)}
          >
            <option value="nothing">Add a command line to the simulator</option>
            {commandLine
              .filter(
                s =>
                  !(selectedSimulator.commandLines || []).find(c => c === s.id)
              )
              .map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
          <div>
            {(selectedSimulator.commandLines || []).map(s => {
              const command = commandLine.find(c => c.id === s);
              if (!command) return null;
              return (
                <p key={s}>
                  {" "}
                  <FontAwesome
                    className="text-danger"
                    name="ban"
                    onClick={() => removeCommandLine(s, action)}
                  />{" "}
                  {command.name}{" "}
                  <ul>
                    {command.commands.map(c => (
                      <li key={c.name}>{c.name}</li>
                    ))}
                  </ul>
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
  query CommandLines {
    commandLine {
      id
      name
      commands {
        name
      }
    }
  }
`;

export default graphql(QUERY)(App);
