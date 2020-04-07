import React from "react";
import {StageComponent, useEntitySetStageMutation} from "generated/graphql";
import {Label, Input, Collapse} from "reactstrap";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import debounce from "helpers/debounce";

interface StageEditProps {
  id: string;
  stage: StageComponent;
}

const Stage: React.FC<StageEditProps> = ({id, stage}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  const [setStage] = useEntitySetStageMutation();

  const setStageDebounce = React.useCallback(debounce(setStage, 1000), []);

  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Stage
      </h3>
      <Collapse isOpen={collapse} timeout={100}>
        <Label>
          Scale Label
          <Input
            type="text"
            defaultValue={stage.scaleLabel || "Meters"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStageDebounce({variables: {id, scaleLabel: e.target.value}})
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
      </Collapse>
    </>
  );
};

export default Stage;
