import React from "react";

import Mission from "./mission";
import ClassicMission from "./classicMission";
import Thumbnail from "./thumbnail";
import MissionSelector from "./missionSelector";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import "./style.scss";
import {
  Simulator,
  Client,
  useTimelineMissionSubscription,
  useTimelineSimulatorSubscription,
} from "generated/graphql";
import Build from "./Build";

interface TimelineProps {
  simulator: Simulator;
  clients: Client[];
}

const Timeline: React.FC<TimelineProps> = ({
  simulator: {id: simulatorId, stations},
  clients,
}) => {
  const {data} = useTimelineMissionSubscription();
  const {data: simData} = useTimelineSimulatorSubscription({
    variables: {simulatorId},
  });

  const {
    currentTimelineStep,
    executedTimelineSteps,
    missionConfigs,
    stationSet,
  } = simData?.simulatorsUpdate?.[0] || {};

  const stationSetId = stationSet?.id || "";

  const mission = data?.missionsUpdate.find(
    m => m.id === simData?.simulatorsUpdate?.[0]?.mission?.id,
  );

  const [timelineMode, setTimelineMode] = useLocalStorage(
    "thorium-timeline-mode",
    "standard",
  );

  const simArgs =
    (mission &&
      missionConfigs?.[mission.id] &&
      missionConfigs?.[mission.id][stationSetId]) ||
    {};

  return (
    <div className="core-timeline">
      <MissionSelector
        simulatorId={simulatorId}
        mission={mission || undefined}
        missions={data?.missionsUpdate || []}
        timelineMode={timelineMode}
        setTimelineMode={setTimelineMode}
      />
      {!mission ? (
        <p>Simulator has no mission assigned.</p>
      ) : timelineMode === "standard" ? (
        <Mission
          timeline={mission.timeline}
          simulatorId={simulatorId}
          currentTimelineStep={currentTimelineStep || 0}
          executedTimelineSteps={executedTimelineSteps || []}
          stations={stations || []}
          clients={clients}
          simArgs={simArgs}
          missions={data?.missionsUpdate || []}
        />
      ) : timelineMode === "classic" ? (
        <ClassicMission
          simulatorId={simulatorId}
          timeline={mission.timeline}
          currentTimelineStep={currentTimelineStep || 0}
          executedTimelineSteps={executedTimelineSteps || []}
          stations={stations || []}
          clients={clients}
          simArgs={simArgs}
          missions={data?.missionsUpdate || []}
        />
      ) : timelineMode === "thumbnail" ? (
        <Thumbnail
          simulatorId={simulatorId}
          currentTimelineStep={currentTimelineStep || 0}
          timeline={mission.timeline}
          missions={data?.missionsUpdate || []}
        />
      ) : timelineMode === "build" ? (
        <Build
          simulatorId={simulatorId}
          currentTimelineStep={currentTimelineStep || 0}
          mission={mission}
          stations={stations || []}
          clients={clients}
        />
      ) : null}
    </div>
  );
};
export default Timeline;
