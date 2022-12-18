import React from "react";
import {Label, Input} from "helpers/reactstrap";
import TimelineControl from "./timelineControl";
import TimelineStep from "./timelineStep";
import allowedMacros from "./allowedMacros";
import {
  TimelineStep as TimelineStepI,
  Station,
  Client,
  Mission as MissionI,
} from "generated/graphql";
import useLocalStorage from "helpers/hooks/useLocalStorage";

interface MissionProps {
  simulatorId: string;
  auxTimelineId?: string;
  stations: Station[];
  clients: Client[];
  simArgs: any;
  executedTimelineSteps: string[];
  currentTimelineStep: number;
  timeline: TimelineStepI[];
  missions: MissionI[];
}

const Mission: React.FC<MissionProps> = ({
  simulatorId,
  auxTimelineId,
  stations,
  clients,
  simArgs,
  timeline,
  currentTimelineStep,
  executedTimelineSteps,
  missions,
}) => {
  const currentStep = timeline[currentTimelineStep];

  const [showDescriptions, setShowDescriptions] = useLocalStorage(
    "thorium_coreShowDetails",
    false,
  );
  const [values, setValues] = React.useState<{[key: string]: any}>({});
  const [delay, setDelay] = React.useState<{[key: string]: number}>({});
  const [actions, setActions] = React.useState<{[key: string]: boolean}>(
    currentStep
      ? currentStep.timelineItems.reduce(
          (prev, next) =>
            executedTimelineSteps.indexOf(next.id) > -1 &&
            allowedMacros.indexOf(next.event) === -1
              ? prev
              : Object.assign(prev, {[next.id]: true}),
          {},
        )
      : {},
  );

  React.useEffect(() => {
    const actions = currentStep
      ? currentStep.timelineItems.reduce(
          (prev, next) =>
            executedTimelineSteps.indexOf(next.id) > -1 &&
            allowedMacros.indexOf(next.event) === -1
              ? prev
              : Object.assign(prev, {[next.id]: true}),
          {},
        )
      : {};
    setActions(actions);
  }, [currentStep, executedTimelineSteps]);

  return (
    <>
      <TimelineControl
        auxTimelineId={auxTimelineId}
        simulatorId={simulatorId}
        timeline={timeline}
        currentTimelineStep={currentTimelineStep}
        actions={actions}
        values={values}
        delay={delay}
      />
      <div>
        <Label check>
          Expand Details
          <Input
            type="checkbox"
            checked={showDescriptions}
            onChange={e => {
              setShowDescriptions(e.target.checked);
            }}
            style={{margin: 0}}
          />
          -{" "}
        </Label>
      </div>
      <div className="text-success">
        Green indicates the action has already been triggered
      </div>
      <TimelineStep
        actions={actions}
        checkAction={(step: string) =>
          setActions(actions => ({...actions, [step]: !actions[step]}))
        }
        timeline={timeline}
        executedTimelineSteps={executedTimelineSteps}
        currentTimelineStep={currentTimelineStep}
        showDescription={showDescriptions}
        simulatorId={simulatorId}
        values={values}
        updateValues={updatedValues => {
          setValues(updatedValues);
        }}
        delay={delay}
        updateDelay={setDelay}
        stations={stations}
        clients={clients}
        simArgs={simArgs}
        missions={missions}
      />
    </>
  );
};

export default Mission;
