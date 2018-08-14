import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <div>
      <p>Performs the action on all stations in the simulator.</p>
      <FormGroup className="macro-addTractorTarget">
        <strong>Action</strong>
        <div>{args.action || "nothing"}</div>
      </FormGroup>
    </div>
  );
};
