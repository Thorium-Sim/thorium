import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {MacroConfigProps} from "helpers/genericTypes";

const SensorScanResult: React.FC<MacroConfigProps> = ({updateArgs, args}) => {
  return (
    <FormGroup className="macro-template">
      <Label>
        Domain
        <Input
          type="select"
          defaultValue={args.domain || "external"}
          onChange={e => updateArgs("domain", e.target.value)}
        >
          <option value="external">External</option>
          <option value="internal">Internal</option>
        </Input>
      </Label>
      <Label>
        Results
        <Input
          type="textarea"
          defaultValue={args.result || ""}
          onChange={e => updateArgs("result", e.target.value)}
        />
      </Label>
    </FormGroup>
  );
};

export const sensorScanResult = SensorScanResult;
