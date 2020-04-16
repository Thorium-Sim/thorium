import React from "react";
import {useSetSimulatorMissionMutation, Mission} from "generated/graphql";
import {Button} from "reactstrap";

const MissionBranchButton: React.FC<{
  args: string;
  missions: Mission[];
  simulatorId: string;
}> = ({args, missions, simulatorId}) => {
  const parsedArgs = JSON.parse(args);
  const [setMission] = useSetSimulatorMissionMutation();
  const mission = missions?.find(m => m.id === parsedArgs.missionId);
  let stepIndex =
    mission?.timeline.findIndex(t => t.id === parsedArgs.stepId) || 0;
  stepIndex = stepIndex === -1 ? 0 : stepIndex;
  if (mission) {
    return (
      <Button
        color={parsedArgs.color || "primary"}
        size="sm"
        block
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setMission({
            variables: {
              simulatorId: simulatorId,
              missionId: parsedArgs.missionId,
              stepId: parsedArgs.stepId,
            },
          });
        }}
      >
        {parsedArgs.label || `${mission?.name} - Step ${stepIndex + 1}`}
      </Button>
    );
  }
  return null;
};

export default MissionBranchButton;
