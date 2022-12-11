import React from "react";
import {
  CountermeasureSlotEnum,
  useCountermeasureCreateCountermeasureMutation,
} from "generated/graphql";
import {Button, Input} from "reactstrap";

interface CreateButtonProps {
  countermeasureId: string;
  slotId: CountermeasureSlotEnum;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  countermeasureId,
  slotId,
}) => {
  const [settingName, setSettingName] = React.useState(false);
  const [name, setName] = React.useState("");
  const [addCountermeasure] = useCountermeasureCreateCountermeasureMutation({
    variables: {
      id: countermeasureId,
      slot: slotId,
      name,
    },
  });

  return settingName ? (
    <div className="countermeasure-name">
      <Input
        type="text"
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button
        color="danger"
        onClick={() => {
          setSettingName(false);
          setName("");
        }}
      >
        Cancel
      </Button>
      <Button
        color="success"
        disabled={!name}
        onClick={() => {
          addCountermeasure();
          setSettingName(false);
          setName("");
        }}
      >
        Create
      </Button>
    </div>
  ) : (
    <Button
      block
      disabled={!slotId}
      color="success"
      onClick={() => setSettingName(true)}
      className="create-countermeasure"
    >
      Create Countermeasure
    </Button>
  );
};

export default CreateButton;
