import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs = () => {}, args, client }) => {
  return (
    <FormGroup className="macro-sendMessage">
      <Label>
        Destination{" "}
        <small>The name of the station which will recieve this message</small>
      </Label>
      <Input
        type="text"
        defaultValue={args ? args.destination : ""}
        onChange={e => updateArgs("destination", e.target.value)}
      />
      <Label>
        Sender{" "}
        <small>
          The name of the station or entity which sent this message.
        </small>
      </Label>
      <Input
        type="text"
        defaultValue={args ? args.sender : ""}
        onChange={e => updateArgs("sender", e.target.value)}
      />
      <Label>Content</Label>
      <Input
        type="textarea"
        rows={5}
        defaultValue={args ? args.content : ""}
        onChange={e => updateArgs("content", e.target.value)}
      />
    </FormGroup>
  );
};
