import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-sendMessage">
      <strong>
        Destination{" "}
        <small>The name of the station which will recieve this message</small>
      </strong>
      <div>{args ? args.destination : ""}</div>
      <strong>
        Sender{" "}
        <small>
          The name of the station or entity which sent this message.
        </small>
      </strong>
      <div>{args ? args.sender : ""}</div>
      <strong>Content</strong>
      <div>{args ? args.content : ""}</div>
    </FormGroup>
  );
};
