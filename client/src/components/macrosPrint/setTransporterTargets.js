import React from "react";
import { FormGroup } from "helpers/reactstrap";

export default ({ args }) => {
  args = args || {};
  return (
    <div>
      <FormGroup className="macro-TransporterTargets">
        <strong>Targets</strong>
        <div>{args.targets}</div>
      </FormGroup>
    </div>
  );
};
