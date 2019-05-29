import React, { Fragment, Component } from "react";
import { Label, Input } from "reactstrap";
import TimelineControl from "./timelineControl";
import TimelineStep from "./timelineStep";
import allowedMacros from "./allowedMacros";

class Mission extends Component {
  constructor(props) {
    super(props);
    const { executedTimelineSteps, timeline, currentTimelineStep } = props;
    const currentStep = timeline[currentTimelineStep];
    this.state = {
      values: {},
      showDescriptions:
        window.localStorage.getItem("thorium_coreShowDetails") === "true",
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
      timeline,
      auxTimelineId,
      stations,
      clients
    } = this.props;
    const { actions, showDescriptions, values, delay } = this.state;
    return (
      <Fragment>
        <h4>{name}</h4>
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
                this.setState({ showDescriptions: e.target.checked });
                window.localStorage.setItem(
                  "thorium_coreShowDetails",
                  e.target.checked
                );
              }}
              style={{ margin: 0 }}
            />
            -{" "}
          </Label>
        </div>
        <div className="text-success">
          Green indicates the action has already been triggered
        </div>
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
          showDescription={showDescriptions}
          simulatorId={simulatorId}
          values={values}
          updateValues={updatedValues => {
            this.setState({ values: updatedValues });
          }}
          delay={delay}
          updateDelay={newDelay => {
            this.setState({ delay: newDelay });
          }}
          stations={stations}
          clients={clients}
        />
      </Fragment>
    );
  }
}
export default Mission;
