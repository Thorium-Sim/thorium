import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {MacroConfigProps} from "helpers/genericTypes";

const ComputerCoreAddHacker: React.FC<MacroConfigProps> = ({
  updateArgs,
  args,
}) => {
  return (
    <FormGroup className="macro-template">
      <Label>
        Name
        <Input
          defaultValue={args.name}
          onChange={e => updateArgs("name", e.target.value)}
        />
        <small>Leave blank for random hacker name</small>
      </Label>
      <Label>
        Level
        <Input
          type="select"
          value={args.level || ""}
          onChange={e => updateArgs("level", parseInt(e.target.value, 10))}
        >
          <option disabled value="">
            Choose a level
          </option>
          {Array.from({length: 10}).map((_, i) => (
            <option key={`level-${i}`} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Input>
        <small>Leave blank for random level</small>
      </Label>
    </FormGroup>
  );
};

export const computerCoreAddHacker = ComputerCoreAddHacker;
