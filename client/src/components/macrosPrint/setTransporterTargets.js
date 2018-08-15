import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <div>
      <FormGroup className="macro-TransporterTargets">
        <strong>Targets</strong>
        <div>{args.targets}</div>
      </FormGroup>
    </div>
  );
};
