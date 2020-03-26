import React, {Fragment} from "react";
import TimelineItem from "./timelineItem";
import {
  TimelineStep as TimelineStepI,
  Station,
  Client,
} from "generated/graphql";

interface TimelineStepProps {
  simulatorId: string;
  actions: {[key: string]: boolean};
  timeline: TimelineStepI[];
  executedTimelineSteps: string[];
  currentTimelineStep: number;
  checkAction: (step: string) => void;
  showDescription: boolean;
  values: {[key: string]: any};
  updateValues: (v: {[key: string]: any}) => void;
  delay: {[key: string]: number};
  updateDelay: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
  stations: Station[];
  clients: Client[];
  simArgs: any;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  simulatorId,
  actions,
  timeline,
  executedTimelineSteps,
  currentTimelineStep,
  checkAction,
  showDescription,
  values = {},
  updateValues,
  delay,
  updateDelay,
  stations,
  clients,
  simArgs,
}) => {
  const currentStep = timeline[currentTimelineStep];

  if (currentStep)
    return (
      <Fragment>
        <h5>{currentStep.name}</h5>
        <p className="mission-step-description">{currentStep.description}</p>
        <ul className="timeline-list">
          {currentStep.timelineItems.map(i => (
            <TimelineItem
              // {...i}
              id={i.id}
              event={i.event}
              name={i.name || ""}
              args={i.args || "{}"}
              steps={timeline}
              simulatorId={simulatorId}
              showDescription={showDescription}
              actions={actions}
              checkAction={checkAction}
              executedTimelineSteps={executedTimelineSteps}
              key={i.id}
              values={values}
              updateValues={updateValues}
              delay={delay}
              itemDelay={i.delay || 0}
              updateDelay={updateDelay}
              stations={stations}
              clients={clients}
              simArgs={simArgs}
            />
          ))}
        </ul>
      </Fragment>
    );
  return <h5>End of Timeline</h5>;
};
export default TimelineStep;
