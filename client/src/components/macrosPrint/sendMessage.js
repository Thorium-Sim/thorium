import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-sendMessage">
      <strong>Destination</strong>
      <div>{args ? args.destination : ""}</div>
      <strong>Sender</strong>
      <div>{args ? args.sender : ""}</div>
      <strong>Content</strong>
      <div>{args ? args.content : ""}</div>
    </FormGroup>
  );
};
