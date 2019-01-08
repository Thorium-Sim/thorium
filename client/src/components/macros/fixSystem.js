import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const systems = [
  "LongRangeComm",
  "InternalComm",
  "Engine",
  "Thrusters",
  "Navigation",
  "Sensors",
  "Probes",
  "TractorBeam",
  "Transporters",
  "Reactor",
  "StealthField",
  "Shield",
  "Targeting",
  "Phasers",
  "Coolant",
  "Torpedo",
  "ShortRangeComm",
  "SignalJammer",
  "ComputerCore",
  "Thx",
  "Sickbay",
  "JumpDrive",
  "Railgun"
];

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-addShortRangeComm">
      <p>
        Fix a system based on the system type. If there are more than one of a
        type, you must specify the exact name of the system. Otherwise, it will
        repair a random broken system of that type.
      </p>
      <Label>System Type</Label>
      <Input
        type="select"
        value={args.type || "select"}
        onChange={evt => updateArgs("type", evt.target.value)}
      >
        <option value={"select"}>Pick a Type</option>
        {systems.map(s => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Input>
      <Label>Name</Label>
      <Input
        type="text"
        placeholder="Optional"
        defaultValue={args.name}
        onBlur={evt => updateArgs("name", evt.target.value)}
      />
    </FormGroup>
  );
};
