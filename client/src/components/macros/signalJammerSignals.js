import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <div>
      <FormGroup className="macro-signalJammer">
        <Label>Action</Label>
        <Input
          type="select"
          value={args.type || "nothing"}
          onChange={e => updateArgs("type", e.target.value)}
        >
          <option disabled value="nothing">
            Pick a type
          </option>
          <option value="comm">Comm</option>
          <option value="tactical">Tactical</option>
          <option value="sensors">Sensors</option>
        </Input>
        <Input
          type="number"
          min="0"
          max="10"
          value={args.signals}
          onChange={e => updateArgs("signals", e.target.value)}
        />
      </FormGroup>
    </div>
  );
};
