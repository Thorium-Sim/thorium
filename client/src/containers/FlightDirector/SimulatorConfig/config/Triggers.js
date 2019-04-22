import React from "react";
import gql from "graphql-tag.macro";
import { graphql, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";

const App = ({ data: { loading, triggers }, selectedSimulator, client }) => {
  const updateTriggers = (e, action) => {
    const variables = {
      simulatorId: selectedSimulator.id,
      triggers: selectedSimulator.triggers.concat(e.target.value)
    };
    action({
      variables
    });
  };
  const removeTriggers = (id, action) => {
    const variables = {
      simulatorId: selectedSimulator.id,
      triggers: (selectedSimulator.triggers || []).filter(s => s !== id)
    };
    action({
      variables
    });
  };
  if (loading || !triggers) return null;
  return (
    <Mutation
      mutation={gql`
        mutation UpdateSimulatorTriggers($simulatorId: ID!, $triggers: [ID]!) {
          updateSimulatorTriggers(
            simulatorId: $simulatorId
            triggers: $triggers
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
            onChange={e => updateTriggers(e, action)}
          >
            <option value="nothing">Add a trigger to the simulator</option>
            {triggers
              .filter(
                s => !(selectedSimulator.triggers || []).find(c => c === s.id)
              )
              .map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
          <div>
            {(selectedSimulator.triggers || []).map(s => {
              const trigger = triggers.find(c => c.id === s);
              if (!trigger) return null;
              return (
                <p key={s}>
                  {" "}
                  <FontAwesome
                    className="text-danger"
                    name="ban"
                    onClick={() => removeTriggers(s, action)}
                  />{" "}
                  {trigger.name}{" "}
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
  query Triggers {
    triggers {
      id
      name
    }
  }
`;

export default graphql(QUERY)(App);
