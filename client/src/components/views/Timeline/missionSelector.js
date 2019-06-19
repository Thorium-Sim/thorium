import React from "react";
import { Button } from "helpers/reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import titleCase from "title-case";

const MissionSelector = ({
  mission,
  simulatorId,
  missions,
  onChange,
  timelineMode,
  setTimelineMode
}) => {
  return (
    <div style={{ display: "flex" }}>
      <Mutation
        mutation={gql`
          mutation SetSimulatorMission($simulatorId: ID!, $missionId: ID!) {
            setSimulatorMission(
              simulatorId: $simulatorId
              missionId: $missionId
            )
          }
        `}
      >
        {action => (
          <select
            style={{ flex: 1 }}
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
      {timelineMode && (
        <Button
          size="sm"
          color="info"
          onClick={() =>
            setTimelineMode(
              timelineMode === "standard" ? "classic" : "standard"
            )
          }
        >
          {titleCase(timelineMode)}
        </Button>
      )}
    </div>
  );
};
export default MissionSelector;
