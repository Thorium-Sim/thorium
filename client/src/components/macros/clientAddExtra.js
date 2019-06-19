import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args: { name }, client }) => {
  return (
    <FormGroup className="macro-template">
      <Label>Crew Station Name</Label>{" "}
      <Input
        type="text"
        defaultValue={name}
        placeholder="Captain"
        onBlur={evt => updateArgs("name", evt.target.value)}
      />
    </FormGroup>
  );
};
