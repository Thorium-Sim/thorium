import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-template">
      <Label>Frequency</Label>
      <p>Enter a number between 100 and 350.</p>
      <Input
        type="number"
        min="100"
        max="350"
        defaultValue={args.frequency}
        onBlur={evt => updateArgs("frequency", evt.target.value)}
      />
    </FormGroup>
  );
};
