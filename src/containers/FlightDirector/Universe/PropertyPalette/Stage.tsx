import React from "react";
import {
  StageComponent,
  useEntitySetStageMutation,
  useEntityRemoveStageMutation,
  StageChildComponent,
} from "generated/graphql";
import {Label, Input, Collapse, Button} from "reactstrap";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import debounce from "helpers/debounce";

interface StageEditProps {
  id: string;
  stage?: StageComponent;
  stageChild?: StageChildComponent;
  currentStage: string;
  setCurrentStage?: React.Dispatch<React.SetStateAction<string>>;
}

const Stage: React.FC<StageEditProps> = ({
  id,
  stage,
  stageChild,
  currentStage,
  setCurrentStage,
}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const [setStage] = useEntitySetStageMutation();
  const [removeStage] = useEntityRemoveStageMutation();

  const setStageDebounce = React.useCallback(debounce(setStage, 1000), []);
  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Stage
      </h3>
      <Collapse isOpen={collapse} timeout={100}>
        {stageChild?.parent && (
          <Label>
            Parent:{" "}
            <Button
              color="link"
              size="sm"
              tag="span"
              className="inline"
              onClick={() =>
                stageChild?.parent?.id &&
                setCurrentStage?.(stageChild?.parent?.id)
              }
            >
              {stageChild?.parent?.identity?.name}
            </Button>
          </Label>
        )}
        {id !== "root-stage" && (
          <Label style={{paddingLeft: "1rem"}}>
            <Input
              type="checkbox"
              checked={Boolean(stage)}
              onChange={e => {
                if (e.target.checked) {
                  setStage({variables: {id}});
                } else {
                  if (
                    !window.confirm(
                      "Are you sure you want to do this? It will delete all of the stage's children entities.",
                    )
                  )
                    return;
                  removeStage({variables: {id}});
                }
              }}
            />{" "}
            Use Entity As Sub-Stage
          </Label>
        )}
        {stage && (
          <>
            <Label>
              Scale Label
              <Input
                type="text"
                defaultValue={stage.scaleLabel || "Meters"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStageDebounce({
                    variables: {id, scaleLabel: e.target.value},
                  })
                }
              />
            </Label>
            <Label>
              Scale Label Short
              <Input
                type="text"
                defaultValue={stage.scaleLabelShort || "M"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStageDebounce({
                    variables: {id, scaleLabelShort: e.target.value},
                  })
                }
              />
            </Label>
            <Label>
              Skybox Seed
              <Input
                type="text"
                defaultValue={stage.skyboxKey || "M"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStageDebounce({variables: {id, skyboxKey: e.target.value}})
                }
              />
            </Label>
          </>
        )}
      </Collapse>
    </>
  );
};

export default Stage;
