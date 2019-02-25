import React from "react";
import MissionSelector from "./missionSelector";
import allowedMacros from "./allowedMacros";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { VideoPreview } from "../TacticalMap/fileExplorer";

const StepRender = ({ args, event }) => {
  const stepArgs = JSON.parse(args);
  console.log(stepArgs);
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

          backgroundColor: "black"
        }}
      >
        <p style={{ color: "white", fontSize: "24px", padding: "16px" }}>
          Auto
        </p>
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
const Mission = ({
  timeline,
  id: simulatorId,
  currentTimelineStep,
  triggerMacros,
  updateTimelineStep
}) => {
  const filteredTimeline = timeline.filter(step =>
    step.timelineItems.find(i => allowedMacros.indexOf(i.event) > -1)
  );
  const runMacro = t => {
    if (!t) return;
    const stepIndex = filteredTimeline.findIndex(i => i.id === t.id);
    const variables = {
      simulatorId,
      macros: t.timelineItems
        .filter(a => allowedMacros.indexOf(a.event) > -1)
        .map(tt => {
          const args =
            typeof tt.args === "string"
              ? JSON.stringify({ ...JSON.parse(tt.args) })
              : JSON.stringify({ ...tt.args });
          return {
            stepId: tt.id,
            event: tt.event,
            args,
            delay: tt.delay
          };
        })
    };
    triggerMacros({ variables });
    updateTimelineStep &&
      updateTimelineStep({
        variables: {
          simulatorId,
          step: stepIndex
        }
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
              stepIndex === currentTimelineStep ? "current-step" : ""
            } timeline-thumbnail`}
            onClick={() => runMacro(t)}
          >
            {t.timelineItems.map(i => (
              <StepRender key={i.id} {...i} />
            ))}
            <p>
              {stepIndex + 1}: {t.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
const TimelineThumbnailCore = ({
  id,
  currentTimelineStep,
  mission,
  missions
}) => {
  return (
    <div>
      <MissionSelector simulatorId={id} mission={mission} missions={missions} />
      {!mission ? (
        <p>Simulator has no mission assigned.</p>
      ) : (
        <Mutation
          mutation={gql`
            mutation UpdateTimelineStep($simulatorId: ID!, $step: Int!) {
              setSimulatorTimelineStep(simulatorId: $simulatorId, step: $step)
            }
          `}
        >
          {updateTimelineStep => (
            <Mutation
              mutation={gql`
                mutation ExecuteMacro(
                  $simulatorId: ID!
                  $macros: [MacroInput]!
                ) {
                  triggerMacros(simulatorId: $simulatorId, macros: $macros)
                }
              `}
            >
              {triggerMacros => (
                <Mission
                  {...mission}
                  id={id}
                  currentTimelineStep={currentTimelineStep}
                  triggerMacros={triggerMacros}
                  updateTimelineStep={updateTimelineStep}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </div>
  );
};

export default TimelineThumbnailCore;
