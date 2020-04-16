import React from "react";
import allowedMacros from "./allowedMacros";
import {VideoPreview} from "../TacticalMap/fileExplorer";
import triggerLocalMacros from "helpers/triggerLocalMacros";
import {
  TimelineStep,
  useSetSimulatorTimelineStepMutation,
  useExecuteMacrosMutation,
  Mission,
} from "generated/graphql";
import MissionBranchButton from "./missionBranchButton";

const StepRender: React.FC<{args: string; event: string}> = ({args, event}) => {
  const stepArgs = JSON.parse(args) || {};
  if (event === "updateViewscreenComponent") {
    if (stepArgs.component === "Video") {
      const data = JSON.parse(stepArgs.data) || {};
      return <VideoPreview src={`/assets${data.asset}`} />;
    }
    return (
      <img
        alt={`Viewscreen Preview ${stepArgs.component}`}
        src={`/viewscreen/${stepArgs.component}.jpg`}
        draggable="false"
      />
    );
  }
  if (event === "setViewscreenToAuto") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "black",
        }}
      >
        <p style={{color: "white", fontSize: "24px", padding: "16px"}}>Auto</p>
      </div>
    );
  }
  if (event === "showViewscreenTactical") {
    return (
      <img
        alt={`Viewscreen Preview TacticalMap`}
        src={`/viewscreen/TacticalMap.jpg`}
        draggable="false"
      />
    );
  }
  return null;
};

interface MissionProps {
  timeline: TimelineStep[];
  simulatorId: string;
  currentTimelineStep: number;
  missions: Mission[];
}

const TimelineThumbnailCore: React.FC<MissionProps> = ({
  timeline,
  simulatorId,
  currentTimelineStep,
  missions,
}) => {
  const [setTimelineStep] = useSetSimulatorTimelineStepMutation();
  const [triggerMacros] = useExecuteMacrosMutation();

  const filteredTimeline = timeline
    .map((t, i) => ({...t, index: i}))
    .filter(step =>
      step.timelineItems.find(i => allowedMacros.indexOf(i.event) > -1),
    );
  const runMacro = (t: TimelineStep) => {
    if (!t) return;
    const stepIndex = filteredTimeline.find(i => i.id === t.id)?.index ?? null;
    if (stepIndex === null) return;

    const macros = t.timelineItems
      .filter(a => allowedMacros.indexOf(a.event) > -1)
      .map(tt => {
        const args = !tt.args
          ? "{}"
          : typeof tt.args === "string"
          ? JSON.stringify({...JSON.parse(tt.args)})
          : JSON.stringify({...(tt.args as Object)});
        return {
          stepId: tt.id,
          event: tt.event,
          args,
          delay: tt.delay || 0,
        };
      });
    const variables = {
      simulatorId,
      macros,
    };
    triggerLocalMacros(macros);
    triggerMacros({variables});
    setTimelineStep({
      variables: {
        simulatorId,
        step: stepIndex + 1,
      },
    });
  };
  if (filteredTimeline.length === 0)
    return <div>No viewscreen timeline actions.</div>;
  return (
    <div className="thumbnail-list">
      {filteredTimeline.map(t => {
        const stepIndex = timeline.findIndex(i => i.id === t.id);

        return (
          <div
            key={t.id}
            className={`${
              stepIndex === currentTimelineStep - 1 ? "current-step" : ""
            } timeline-thumbnail`}
            onClick={() => runMacro(t)}
          >
            {t.timelineItems.map(i => (
              <StepRender key={i.id} event={i.event} args={i.args || "{}"} />
            ))}
            {t?.timelineItems.find(m => m.event === "setSimulatorMission") && (
              <>
                <p>
                  <strong>Click a button to change timelines</strong>
                </p>
                {t?.timelineItems
                  .filter(m => m.event === "setSimulatorMission")
                  .map(
                    ({args}) =>
                      args && (
                        <MissionBranchButton
                          simulatorId={simulatorId}
                          missions={missions || []}
                          args={args}
                        />
                      ),
                  )}
              </>
            )}
            <p>
              {stepIndex + 1}: {t.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineThumbnailCore;
