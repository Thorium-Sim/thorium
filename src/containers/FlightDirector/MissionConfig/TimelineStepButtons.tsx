import React from "react";
import {Button, ButtonGroup} from "helpers/reactstrap";
import {
  useTimelineAddStepMutation,
  useTimelineReorderStepMutation,
  useTimelineRemoveStepMutation,
  useTimelineDuplicateStepMutation,
  Mission,
} from "generated/graphql";
import {GiBanana} from "react-icons/gi";

interface TimelineStepButtonsProps {
  mission: Mission;
  setSelectedTimelineStep: (v: string | null) => void;
  selectedTimelineStep: string | null;
  removeMission?: () => void;
  exportMissionScript?: (mission: Mission) => void;
  simple?: boolean;
  watchMe?: boolean;
  setWatchMe?: Function;
}
const TimelineStepButtons: React.FC<TimelineStepButtonsProps> = ({
  mission,
  setSelectedTimelineStep,
  selectedTimelineStep,
  exportMissionScript,
  removeMission,
  simple,
  watchMe,
  setWatchMe,
}) => {
  const [addStepMutation] = useTimelineAddStepMutation();
  const [removeStepMutation] = useTimelineRemoveStepMutation();
  const [duplicateStepMutation] = useTimelineDuplicateStepMutation();
  const [reorderStepMutation] = useTimelineReorderStepMutation();

  const addTimelineStep = async (inserted: boolean) => {
    const name = prompt("What is the name of the timeline step?");
    if (!name) return;

    const variables = {
      name,
      missionId: mission.id,
    };
    const res = await addStepMutation({variables});

    if (!res) return;
    const stepId = res.data?.addTimelineStep;
    if (inserted !== true && stepId) {
      setSelectedTimelineStep(stepId);
    }
    return stepId;
  };
  const insertTimelineStep = async () => {
    const stepId = await addTimelineStep(true);
    if (!stepId) return;
    const newIndex =
      mission.timeline.findIndex(s => s.id === selectedTimelineStep) + 1;
    const variables = {
      missionId: mission.id,
      timelineStepId: stepId,
      order: newIndex,
    };
    reorderStepMutation({variables});
    setSelectedTimelineStep(stepId);
  };
  const removeTimelineStep = (timelineStep: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this timeline step?")) {
      if (timelineStep === selectedTimelineStep) {
        setSelectedTimelineStep(null);
      }

      const variables = {
        timelineStepId: timelineStep,
        missionId: mission.id,
      };
      removeStepMutation({variables});
    }
  };
  const duplicateTimelineStep = () => {
    if (!selectedTimelineStep) return;
    const timelineStepId = selectedTimelineStep;
    const {id: missionId} = mission;

    duplicateStepMutation({variables: {missionId, timelineStepId}});
  };
  return (
    <>
      <ButtonGroup>
        <Button color="success" size="sm" onClick={addTimelineStep}>
          Add Step
        </Button>

        {selectedTimelineStep && selectedTimelineStep !== "mission" && (
          <>
            <Button color="warning" size="sm" onClick={insertTimelineStep}>
              Insert Step
            </Button>
            <Button color="info" size="sm" onClick={duplicateTimelineStep}>
              Duplicate
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={(e: React.MouseEvent) =>
                removeTimelineStep(selectedTimelineStep, e)
              }
            >
              Remove
            </Button>
            {setWatchMe && (
              <Button
                title="Watch Me Mode"
                color={watchMe ? "danger" : "dark"}
                size="sm"
                className={`${watchMe ? "recording-pulse" : ""} text-warning`}
                onClick={() => setWatchMe(!watchMe)}
              >
                <GiBanana />
              </Button>
            )}
          </>
        )}
      </ButtonGroup>
      {!simple && (
        <>
          <Button
            tag="a"
            size="sm"
            href={`/exportMission/${mission.id}`}
            block
            color="info"
          >
            Export Mission
          </Button>
          <Button
            color="warning"
            size="sm"
            block
            onClick={() => exportMissionScript?.(mission)}
          >
            Export Mission Script
          </Button>
          <Button block onClick={removeMission} size="sm" color="danger">
            Remove Mission
          </Button>
        </>
      )}
    </>
  );
};

export default TimelineStepButtons;
