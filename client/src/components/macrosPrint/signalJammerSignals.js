import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <div>
      <FormGroup className="macro-signalJammer">
        <strong>Signal Type</strong>
        <div>{args.type || "nothing"}</div>
        <strong>Signal Strength (0 - 10)</strong>
        <div>{args.signals}</div>
      </FormGroup>
    </div>
  );
};
