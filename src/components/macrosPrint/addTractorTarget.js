import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  const updateLabel = e => {
    updateArgs("label", e.target.value);
  };
  return (
    <FormGroup className="macro-addTractorTarget">
      <Label>Label</Label>
      <Input type="text" value={args.label} onChange={updateLabel} />
    </FormGroup>
  );
};
