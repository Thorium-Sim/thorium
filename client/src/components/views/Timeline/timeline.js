import React from "react";

import Mission from "./mission";
import ClassicMission from "./classicMission";
import MissionSelector from "./missionSelector";
import useLocalStorage from "helpers/hooks/useLocalStorage";

const Timeline = props => {
  const {
    id,
    stationSet: { id: stationSetId },
    missionConfigs,
    mission,
    missions,
    stations,
    clients
  } = props;

  ///const currentStep = mission.
  const [timelineMode, setTimelineMode] = useLocalStorage(
    "thorium-timeline-mode",
    "standard"
  );

  const simArgs =
    (mission &&
      (missionConfigs[mission.id] &&
        missionConfigs[mission.id][stationSetId])) ||
    {};

  return (
    <div className="core-timeline">
      <MissionSelector
        simulatorId={id}
        mission={mission}
        missions={missions}
        timelineMode={timelineMode}
        setTimelineMode={setTimelineMode}
      />
      {!mission ? (
        <p>Simulator has no mission assigned.</p>
      ) : timelineMode === "standard" ? (
        <Mission
          {...props}
          simulatorId={id}
          {...mission}
          stations={stations}
          clients={clients}
          simArgs={simArgs}
        />
      ) : (
        <ClassicMission
          {...props}
          simulatorId={id}
          {...mission}
          stations={stations}
          clients={clients}
          simArgs={simArgs}
        />
      )}
    </div>
  );
};
export default Timeline;
