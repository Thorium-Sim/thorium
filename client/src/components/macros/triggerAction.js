import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <div>
      <p>Performs the action on all stations in the simulator.</p>
      <FormGroup className="macro-addTractorTarget">
        <Label>Action</Label>
        <Input
          type="select"
          value={args.action || "nothing"}
          onChange={e => updateArgs("action", e.target.value)}
        >
          <option disabled value="nothing">
            Pick an action
          </option>
          <option value="flash">Flash</option>
          <option value="spark">Spark</option>
          <option value="freak">Freak</option>
          <option value="sound" disabled>
            Sound
          </option>
          <option value="beep">Beep</option>
          <option value="speak" disabled>
            Speak
          </option>
          <option value="message" disabled>
            Message
          </option>
          <option value="-" disabled>
            -
          </option>
          <option value="blackout">Blackout</option>
          <option value="-" disabled>
            -
          </option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="power">Power Loss</option>
          <option value="lockdown">Lockdown</option>
          <option value="maintenance">Maintenance</option>
          <option value="soviet">Soviet</option>
        </Input>
      </FormGroup>
    </div>
  );
};
