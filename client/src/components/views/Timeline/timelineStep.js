import React, { Fragment } from "react";
import TimelineItem from "./timelineItem";

const TimelineStep = ({
  actions,
  timeline,
  executedTimelineSteps,
  currentTimelineStep,
  checkAction,
  showDescription
}) => {
  const currentStep = timeline[currentTimelineStep];

  if (currentStep)
    return (
      <Fragment>
        <h5>{currentStep.name}</h5>
        <p>{currentStep.description}</p>
        <ul className="timeline-list">
          {currentStep.timelineItems.map(i => (
            <TimelineItem
              {...i}
              showDescription={showDescription}
              actions={actions}
              checkAction={checkAction}
              executedTimelineSteps={executedTimelineSteps}
              key={i.id}
            />
          ))}
        </ul>
      </Fragment>
    );
  return <h5>End of Timeline</h5>;
};
export default TimelineStep;
