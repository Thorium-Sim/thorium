import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-sendLongRangeMessage">
      <strong>Sender</strong>
      <div>{args.sender}</div>
      <strong>
        Message{" "}
        <small>Use of #SIM in message stands for name of simulator</small>
      </strong>
      <pre>{args ? args.message : ""}</pre>
    </FormGroup>
  );
};
