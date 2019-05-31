import React from "react";

import Mission from "./mission";
import MissionSelector from "./missionSelector";
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
  const simArgs =
    (mission &&
      (missionConfigs[mission.id] &&
        missionConfigs[mission.id][stationSetId])) ||
    {};

  return (
    <div className="core-timeline">
      <MissionSelector simulatorId={id} mission={mission} missions={missions} />
      {!mission ? (
        <p>Simulator has no mission assigned.</p>
      ) : (
        <Mission
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
