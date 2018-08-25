import React, { Fragment, Component } from "react";
import TimelineControl from "./timelineControl";
import TimelineStep from "./timelineStep";
import allowedMacros from "./allowedMacros";

class Mission extends Component {
  constructor(props) {
    super(props);
    const { executedTimelineSteps, timeline, currentTimelineStep } = props;
    const currentStep = timeline[currentTimelineStep];
    this.state = {
      actions: currentStep
        ? currentStep.timelineItems.reduce(
            (prev, next) =>
              executedTimelineSteps.indexOf(next.id) > -1 &&
              allowedMacros.indexOf(next.event) === -1
                ? prev
                : Object.assign(prev, { [next.id]: true }),
            {}
          )
        : {}
    };
  }
  state = { actions: {} };
  componentDidUpdate(prevProps) {
    const { executedTimelineSteps, timeline, currentTimelineStep } = this.props;
    if (currentTimelineStep !== prevProps.currentTimelineStep) {
      const currentStep = timeline[currentTimelineStep];
      const actions = currentStep
        ? currentStep.timelineItems.reduce(
            (prev, next) =>
              executedTimelineSteps.indexOf(next.id) > -1 &&
              allowedMacros.indexOf(next.event) === -1
                ? prev
                : Object.assign(prev, { [next.id]: true }),
            {}
          )
        : {};
      this.setState({ actions });
    }
  }
  render() {
    const {
      name,
      simulatorId,
      executedTimelineSteps,
      currentTimelineStep,
      timeline
    } = this.props;
    const { actions } = this.state;
    return (
      <Fragment>
        <h4>{name}</h4>
        <TimelineControl
          simulatorId={simulatorId}
          timeline={timeline}
          currentTimelineStep={currentTimelineStep}
          actions={actions}
        />
        <TimelineStep
          actions={actions}
          checkAction={step =>
            this.setState(state => ({
              actions: { ...state.actions, [step]: !state.actions[step] }
            }))
          }
          timeline={timeline}
          executedTimelineSteps={executedTimelineSteps}
          currentTimelineStep={currentTimelineStep}
        />
      </Fragment>
    );
  }
}
export default Mission;
