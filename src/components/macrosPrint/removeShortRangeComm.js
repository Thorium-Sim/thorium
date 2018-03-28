import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-removeShortRangeComm">
      <strong>Signal Name</strong>
      <div>{args.signalName}</div>
      <strong>Frequency </strong>
      <div>{args.frequency}</div>
    </FormGroup>
  );
};
