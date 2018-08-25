import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args = {} }) => {
  return (
    <FormGroup className="macro-template">
      <Label>Secondary Screen?</Label>
      <Input
        type="checkbox"
        checked={args && args.secondary}
        onChange={evt => updateArgs("secondary", evt.target.checked)}
      />
    </FormGroup>
  );
};
