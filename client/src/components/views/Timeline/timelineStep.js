import React, { Fragment } from "react";
import TimelineItem from "./timelineItem";

const TimelineStep = ({
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
  clients
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
              {...i}
              simulatorId={simulatorId}
              showDescription={showDescription}
              actions={actions}
              checkAction={checkAction}
              executedTimelineSteps={executedTimelineSteps}
              key={i.id}
              values={values}
              updateValues={updateValues}
              updateDelay={updateDelay}
              stations={stations}
              clients={clients}
            />
          ))}
        </ul>
      </Fragment>
    );
  return <h5>End of Timeline</h5>;
};
export default TimelineStep;
