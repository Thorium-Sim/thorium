import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
export default ({ updateArgs, args: { objective = {} } }) => {
  return (
    <FormGroup className="macro-addObjective">
      <Label>Title</Label>
      <Input
        type="text"
        defaultValue={objective.title}
        onBlur={evt =>
          updateArgs(
            "objective",
            Object.assign({}, objective, { title: evt.target.value })
          )
        }
      />
      <Label>Description</Label>
      <Input
        type="text"
        defaultValue={objective.description}
        onBlur={evt =>
          updateArgs(
            "objective",
            Object.assign({}, objective, { description: evt.target.value })
          )
        }
      />
    </FormGroup>
  );
};
