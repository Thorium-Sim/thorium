import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  const lrmText = e => {
    let value = e.target.value;
    const regex = /.*(?= out| out\.)/gi;
    const match = value.match(regex);
    if (match) {
      setTimeout(() => {
        updateArgs("sender", match[match.length - 2]);
      }, 100);
    }
    updateArgs("message", value);
  };
  const updateSender = e => {
    updateArgs("sender", e.target.value);
  };
  if (!args.crew) {
    updateArgs("crew", true);
  }
  return (
    <FormGroup className="macro-sendLongRangeMessage">
      <Label>Sender</Label>
      <Input type="text" value={args.sender} onChange={updateSender} />
      <Label>Message</Label>
      <Input type="textarea" value={args.message} onChange={lrmText} />
    </FormGroup>
  );
};
