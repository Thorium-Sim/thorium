import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args }) => {
  return (
    <FormGroup className="macro-template">
      <Label>
        Key
        <Input
          value={args.key}
          onChange={e => updateArgs("key", e.target.value)}
        />
      </Label>
    </FormGroup>
  );
};
