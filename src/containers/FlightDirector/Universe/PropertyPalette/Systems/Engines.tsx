import React from "react";
import {
  EntityEngineEnum,
  EngineComponent,
  useEntitySetEngineMutation,
  useEntityRemoveEngineMutation,
} from "generated/graphql";
import {capitalCase} from "change-case";
import {Label, Input} from "reactstrap";
interface EnginesProps {
  id: string;
  type: EntityEngineEnum;
  engine?: EngineComponent;
}

const Engines: React.FC<EnginesProps> = ({id, type, engine}) => {
  const [setEngine] = useEntitySetEngineMutation();
  const [removeEngine] = useEntityRemoveEngineMutation();
  return (
    <div>
      <Label style={{paddingLeft: "1rem"}}>
        <h3>
          <Input
            type="checkbox"
            checked={Boolean(engine)}
            onChange={e => {
              if (e.target.checked) {
                setEngine({variables: {id, type}});
              } else {
                removeEngine({variables: {id, type}});
              }
            }}
          />{" "}
          {capitalCase(type)}
        </h3>
      </Label>
    </div>
  );
};

export default Engines;
