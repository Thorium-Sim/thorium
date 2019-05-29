import React from "react";

import Mission from "./mission";
import MissionSelector from "./missionSelector";
const Timeline = props => {
  const { id, mission, missions, stations, clients } = props;
  return (
    <div className="core-timeline">
      <MissionSelector simulatorId={id} mission={mission} missions={missions} />
      {!mission ? (
        <p>Simulator has no mission assigned.</p>
      ) : (
        <Mission {...props} simulatorId={id} {...mission} stations={stations} clients={clients}/>
      )}
    </div>
  );
};
export default Timeline;
