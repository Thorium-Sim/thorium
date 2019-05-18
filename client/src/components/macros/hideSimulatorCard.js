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
      <div>
        <Label>
          Delay to Show
          <Input
            type="number"
            value={args.delay}
            onBlur={e => updateArgs("delay", e.target.value)}
          />
          <small>
            A delay for showing the card again. To not show the card again,
            leave blank or use 0.
          </small>
        </Label>
      </div>
    </FormGroup>
  );
};
