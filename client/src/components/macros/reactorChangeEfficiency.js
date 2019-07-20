import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-template">
      <Label>Efficiency</Label>
      <p>Enter a number between 0 and 1. Use -1 for external power</p>
      <Input
        type="number"
        defaultValue={args.efficiency}
        onBlur={evt => updateArgs("efficiency", evt.target.value)}
      />
    </FormGroup>
  );
};
