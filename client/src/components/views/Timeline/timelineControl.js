import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "helpers/reactstrap";
import FontAwesome from "react-fontawesome";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import StepModal from "./stepModal";

class TimelineControl extends Component {
  state = {};
  runMacro = (triggerMacro, updateTimelineStep) => () => {
    const {
      actions,
      simulatorId,
      auxTimelineId,
      timeline,
      currentTimelineStep,
      values,
      delay = {}
    } = this.props;
    const currentStep = timeline[currentTimelineStep];
    if (!currentStep) return;

    const variables = {
      simulatorId,
      macros: currentStep.timelineItems
        .filter(t => actions[t.id])
        .map(t => {
          const itemValues = values[t.id] || {};
          const args =
            typeof t.args === "string"
              ? JSON.stringify({ ...JSON.parse(t.args), ...itemValues })
              : JSON.stringify({ ...t.args, ...itemValues });
          const stepDelay = delay[t.id];

          return {
            stepId: t.id,
            event: t.event,
            args,
            delay: stepDelay || stepDelay === 0 ? stepDelay : t.delay
          };
        })
    };
    triggerMacro({ variables });
    updateTimelineStep &&
      updateTimelineStep({
        variables: {
          simulatorId,
          auxTimelineId,
          step: currentTimelineStep + 1
        }
      });
  };
  render() {
    const {
      simulatorId,
      timeline,
      currentTimelineStep,
      auxTimelineId
    } = this.props;
    const { modal } = this.state;
    const stepCheck = step => Math.max(0, Math.min(timeline.length - 1, step));
    return (
      <Mutation
        mutation={gql`
          mutation UpdateTimelineStep(
            $simulatorId: ID!
            $auxTimelineId: ID
            $step: Int!
          ) {
            setSimulatorTimelineStep(
              simulatorId: $simulatorId
              timelineId: $auxTimelineId
              step: $step
            )
          }
        `}
      >
        {updateTimelineStep => (
          <Fragment>
            <ButtonGroup size="sm">
              <Button
                color="primary"
                title="Go Back"
                onClick={() =>
                  updateTimelineStep({
                    variables: {
                      simulatorId,
                      auxTimelineId,
                      step: stepCheck(currentTimelineStep - 1)
                    }
                  })
                }
              >
                <FontAwesome fixedWidth name="arrow-left" />
              </Button>
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
                {triggerMacro => (
                  <Fragment>
                    <Button
                      color="warning"
                      title="Run Step & Stay"
                      onClick={this.runMacro(triggerMacro)}
                    >
                      <FontAwesome fixedWidth name="step-forward" />
                    </Button>
                    <Button
                      color="info"
                      onClick={() =>
                        this.setState({
                          modal: true,
                          newStep: currentTimelineStep
                        })
                      }
                    >
                      {currentTimelineStep + 1}
                    </Button>
                    <Button
                      color="success"
                      title="Run & Go Forward"
                      onClick={this.runMacro(triggerMacro, updateTimelineStep)}
                    >
                      <FontAwesome fixedWidth name="play" />
                    </Button>
                  </Fragment>
                )}
              </Mutation>
              <Button
                color="primary"
                title="Go Forward"
                onClick={() =>
                  updateTimelineStep({
                    variables: {
                      simulatorId,
                      auxTimelineId,
                      step: stepCheck(currentTimelineStep + 1)
                    }
                  })
                }
              >
                <FontAwesome fixedWidth name="arrow-right" />
              </Button>
            </ButtonGroup>
            <StepModal
              timeline={timeline}
              newStep={currentTimelineStep}
              modal={modal}
              toggle={() => this.setState({ modal: false })}
              updateStep={step =>
                updateTimelineStep({
                  variables: {
                    simulatorId,
                    auxTimelineId,
                    step: parseInt(step, 10)
                  }
                })
              }
            />
          </Fragment>
        )}
      </Mutation>
    );
  }
}
export default TimelineControl;
