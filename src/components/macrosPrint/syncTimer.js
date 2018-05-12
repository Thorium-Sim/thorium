import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ args }) => {
  return (
    <div>
      <p>Performs the action on all stations in the simulator.</p>
      <FormGroup className="macro-setTimer">
        <div>
          <strong>Hours</strong>
        </div>
        <p>{args.time}</p>
        <Label>Activate Timer</Label>
        <Input type="checkbox" checked={args.active} />
      </FormGroup>
    </div>
  );
};
