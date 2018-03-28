import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-addShortRangeComm">
      <strong>System Type</strong>
      <div>{args ? args.type : "select"}</div>
      <div>
        <strong>Name</strong>
        <div>{args ? args.name : ""}</div>
      </div>
    </FormGroup>
  );
};
