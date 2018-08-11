import React from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";

export default ({ updateArgs = () => {}, args, client }) => {
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
  const updateDecoded = e => {
    updateArgs("decoded", e.target.checked);
  };
  // if (!args || !args.crew) {
  //   updateArgs("crew", true);
  // }
  return (
    <FormGroup className="macro-sendLongRangeMessage">
      <Label>Inbound/Outbound</Label>
      <div>
        <ButtonGroup>
          <Button
            onClick={() => updateArgs("crew", true)}
            active={args ? args.crew : true}
          >
            Inbound
          </Button>
          <Button
            onClick={() => updateArgs("crew", false)}
            active={args ? !args.crew : false}
          >
            Outbound
          </Button>
        </ButtonGroup>
      </div>
      <Label>Sender</Label>
      <Input
        type="text"
        value={args ? args.sender : ""}
        onChange={updateSender}
      />
      <Label>
        Message{" "}
        <small>Use #SIM in your message for the name of the simulator</small>
        <br />
        <small>
          If message is outbound, be sure to include{" "}
          {`"To: <message location>"`} at the top of the message.
        </small>
      </Label>
      <Input
        rows={4}
        type="textarea"
        defaultValue={args ? args.message : ""}
        onBlur={lrmText}
      />
      <Label>
        Decoded
        <Input
          type="checkbox"
          style={{ marginLeft: "20px" }}
          checked={args ? args.decoded : false}
          onChange={updateDecoded}
        />
      </Label>
    </FormGroup>
  );
};
