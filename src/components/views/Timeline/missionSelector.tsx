import React from "react";

import {
  Mission,
  useSetSimulatorMissionMutation,
  useAddMissionMutation,
} from "generated/graphql";

type timelineModes = "standard" | "classic" | "thumbnail" | "build";
interface MissionSelectorProps {
  mission?: Mission;
  simulatorId: string;
  missions: Mission[];
  onChange?: (e: any) => void;
  timelineMode: timelineModes;
  setTimelineMode: React.Dispatch<React.SetStateAction<timelineModes>>;
}

const MissionSelector: React.FC<MissionSelectorProps> = ({
  mission,
  simulatorId,
  missions,
  onChange,
  timelineMode,
  setTimelineMode,
}) => {
  const [setMission] = useSetSimulatorMissionMutation();
  const [addMission] = useAddMissionMutation();
  const categorizedMissions = missions.reduce(
    (prev: {[key: string]: Mission[]}, next) => {
      prev[next.category || ""] = prev[next.category || ""]
        ? prev[next.category || ""].concat(next)
        : [next];
      return prev;
    },
    {},
  );
  return (
    <div style={{display: "flex"}}>
      <select
        style={{flex: 1, height: "24px", fontSize: "16px", maxWidth: "210px"}}
        className="btn-secondary"
        value={mission ? mission.id : "nothing"}
        onChange={e => {
          if (e.target.value === "create-new") {
            const name = window.prompt("What is the name of the new mission?");
            if (name)
              addMission({variables: {name}}).then(res => {
                if (res.data?.createMission) {
                  setMission({
                    variables: {
                      simulatorId,
                      missionId: res.data.createMission,
                    },
                  });
                }
              });
            return;
          }
          onChange
            ? onChange(e)
            : setMission({
                variables: {simulatorId, missionId: e.target.value},
              });
        }}
      >
        <option disabled value="nothing">
          Select a mission
        </option>
        {Object.entries(categorizedMissions).map(([category, missions]) => {
          if (category)
            return (
              <optgroup label={category}>
                {missions.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
            );
          return missions.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ));
        })}
        {timelineMode === "build" && (
          <>
            <hr />
            <option value="create-new">Create New Mission</option>
          </>
        )}
      </select>
      {timelineMode && (
        <select
          style={{height: "24px"}}
          className="btn-info"
          value={timelineMode}
          onChange={e => setTimelineMode(e.target.value as timelineModes)}
        >
          <option value="standard">Standard</option>
          <option value="classic">Classic</option>
          <option value="thumbnail">Thumbnail</option>

          <hr />
          <option value="build">Build</option>
        </select>
      )}
    </div>
  );
};
export default MissionSelector;
