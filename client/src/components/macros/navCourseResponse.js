import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <div>
      <FormGroup className="macro-navCourse">
        <Label>X</Label>
        <Input
          type="text"
          value={args ? args.x : ""}
          onChange={e => updateArgs("x", e.target.value)}
        />
        <Label>Y</Label>
        <Input
          type="text"
          value={args ? args.y : ""}
          onChange={e => updateArgs("y", e.target.value)}
        />
        <Label>Z</Label>
        <Input
          type="text"
          value={args ? args.z : ""}
          onChange={e => updateArgs("z", e.target.value)}
        />
      </FormGroup>
    </div>
  );
};
