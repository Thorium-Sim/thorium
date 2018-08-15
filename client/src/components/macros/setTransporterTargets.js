import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <div>
      <FormGroup className="macro-TransporterTargets">
        <Label>Targets</Label>
        <Input
          type="number"
          min="0"
          max="10"
          value={args.targets}
          onChange={e => updateArgs("targets", e.target.value)}
        />
      </FormGroup>
    </div>
  );
};
