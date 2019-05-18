import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-template">
      <Label>
        Card Name
        <Input
          type="text"
          value={args.cardName}
          onBlur={e => updateArgs("cardName", e.target.value)}
        />
      </Label>
    </FormGroup>
  );
};
