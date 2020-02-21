import React from "react";
import {
  CountermeasureModule,
  useCountermeasureRemoveModuleMutation,
  CountermeasureSlotEnum,
} from "generated/graphql";
import {Button} from "reactstrap";

interface ModuleProps {
  disabled: boolean;
  countermeasuresId: string;
  slotId: CountermeasureSlotEnum;
  moduleObject: CountermeasureModule | null;
  moduleIndex: number;
  setAddingModule: () => void;
  setSelectedModule: (nextState: number | null) => void;
}

const Module: React.FC<ModuleProps> = ({
  disabled,
  countermeasuresId,
  slotId,
  moduleObject,
  moduleIndex,
  setAddingModule,
  setSelectedModule,
}) => {
  const [removeModule] = useCountermeasureRemoveModuleMutation();
  return (
    <div className="module-container">
      <div
        className="module-card card"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.1) ${(moduleObject?.buildProgress ||
            0) * 100}%, rgba(255,255,255,0) ${(moduleObject?.buildProgress ||
            0) * 100}%, transparent 100%)`,
        }}
      >
        {moduleObject ? moduleObject.name : "Empty"}
      </div>
      {moduleObject ? (
        <>
          <Button
            color="info"
            className="config-button"
            disabled={disabled}
            onClick={() => setSelectedModule(moduleIndex)}
          >
            Config
          </Button>
          <Button
            color="danger"
            disabled={disabled}
            onClick={() =>
              removeModule({
                variables: {
                  id: countermeasuresId,
                  slot: slotId,
                  moduleId: moduleObject.id,
                },
              })
            }
          >
            Remove
          </Button>
        </>
      ) : (
        <Button
          className="add"
          disabled={disabled}
          color="success"
          onClick={setAddingModule}
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default Module;
