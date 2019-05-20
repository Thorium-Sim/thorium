import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

const MissionSelector = ({ mission, simulatorId, missions, onChange }) => {
  return (
    <Mutation
      mutation={gql`
        mutation SetSimulatorMission($simulatorId: ID!, $missionId: ID!) {
          setSimulatorMission(simulatorId: $simulatorId, missionId: $missionId)
        }
      `}
    >
      {action => (
        <select
          value={mission ? mission.id : "nothing"}
          onChange={e =>
            onChange
              ? onChange(e)
              : action({
                  variables: { simulatorId, missionId: e.target.value }
                })
          }
        >
          <option disabled value="nothing">
            Select a mission
          </option>
          {missions.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      )}
    </Mutation>
  );
};
export default MissionSelector;
