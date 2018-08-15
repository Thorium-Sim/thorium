import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-addTractorTarget">
      <strong>Label</strong>
      <div>{args && args.label}</div>
    </FormGroup>
  );
};
