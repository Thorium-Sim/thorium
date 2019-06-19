import React from "react";
import { FormGroup } from "helpers/reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-addShortRangeComm">
      <strong>Signal Name</strong>
      <div>{args.signalName}</div>
      <strong>Frequency </strong>
      <div>{args.frequency}</div>
    </FormGroup>
  );
};
