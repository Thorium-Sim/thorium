import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-removeShortRangeComm">
      <p>
        Remove a comm using either the name of the signal or the frequency.
        Usually it should reference a signal which has been put on the screen by
        another macro.
      </p>
      <Label>
        Signal Name{" "}
        <small>
          Use the name of the signal in the Short Range Comm simulator config
        </small>
      </Label>
      <Input
        type="text"
        placeholder="Optional"
        defaultValue={args.signalName}
        onBlur={evt => updateArgs("signalName", evt.target.value)}
      />
      <Label>
        Frequency{" "}
        <small>
          Use a number between 0 and 1. 0 is the top, 1 is the bottom.
        </small>
      </Label>
      <Input
        type="number"
        min="0"
        max="1"
        placeholder="Optional"
        defaultValue={args.frequency}
        onBlur={evt => updateArgs("frequency", evt.target.value)}
      />
    </FormGroup>
  );
};
