import React, {Fragment} from "react";
import {Button, ButtonGroup} from "helpers/reactstrap";
import StepModal from "./stepModal";
import {FaArrowLeft, FaStepForward, FaPlay, FaArrowRight} from "react-icons/fa";
import triggerLocalMacros from "helpers/triggerLocalMacros";
import {
  TimelineStep,
  useSetSimulatorTimelineStepMutation,
  useExecuteMacrosMutation,
} from "generated/graphql";

interface TimelineControl {
  actions: {
    [key: string]: boolean;
  };
  simulatorId: string;
  timeline: TimelineStep[];
  currentTimelineStep: number;
  values: {
    [key: string]: any;
  };
  delay: {
    [key: string]: number;
  };
  auxTimelineId?: string;
}

export const excludedTimelineActions = ["setSimulatorMission"];

const TimelineControl: React.FC<TimelineControl> = ({
  actions,
  simulatorId,
  auxTimelineId,
  timeline,
  currentTimelineStep,
  delay = {},
}) => {
  const [modal, setModal] = React.useState<boolean>(false);

  const [setTimelineStep] = useSetSimulatorTimelineStepMutation();
  const [triggerMacros] = useExecuteMacrosMutation();

  const runMacro = () => {
    const currentStep = timeline[currentTimelineStep];
    if (!currentStep) return;

    const macros = currentStep.timelineItems
      .filter(t => actions[t.id] && !excludedTimelineActions.includes(t.event))
      .map(t => {
        const args = !t.args
          ? "{}"
          : typeof t.args === "string"
          ? JSON.stringify({...JSON.parse(t.args)})
          : JSON.stringify({...(t.args as Object)});
        const stepDelay = delay[t.id];

        return {
          stepId: t.id,
          event: t.event,
          args,
          delay: stepDelay || stepDelay === 0 ? stepDelay : t.delay || 0,
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
        auxTimelineId,
        step: currentTimelineStep + 1,
      },
    });
  };
  const stepCheck = (step: number) =>
    Math.max(0, Math.min(timeline.length - 1, step));
  return (
    <Fragment>
      <ButtonGroup size="sm">
        <Button
          color="primary"
          title="Go Back"
          onClick={() =>
            setTimelineStep({
              variables: {
                simulatorId,
                auxTimelineId,
                step: stepCheck(currentTimelineStep - 1),
              },
            })
          }
        >
          <FaArrowLeft name="arrow-left" />
        </Button>
        <Fragment>
          <Button color="warning" title="Run Step & Stay" onClick={runMacro}>
            <FaStepForward name="step-forward" />
          </Button>
          <Button color="info" onClick={() => setModal(true)}>
            {currentTimelineStep + 1}
          </Button>
          <Button color="success" title="Run & Go Forward" onClick={runMacro}>
            <FaPlay name="play" />
          </Button>
        </Fragment>

        <Button
          color="primary"
          title="Go Forward"
          onClick={() =>
            setTimelineStep({
              variables: {
                simulatorId,
                auxTimelineId,
                step: stepCheck(currentTimelineStep + 1),
              },
            })
          }
        >
          <FaArrowRight name="arrow-right" />
        </Button>
      </ButtonGroup>
      <StepModal
        timeline={timeline}
        newStep={currentTimelineStep}
        modal={modal}
        toggle={() => setModal(false)}
        updateStep={(step: number) => {
          setTimelineStep({
            variables: {
              simulatorId,
              auxTimelineId,
              step,
            },
          });
        }}
      />
    </Fragment>
  );
};

export default TimelineControl;
