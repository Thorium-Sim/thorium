import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

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
  "Torpedo",
  "ShortRangeComm",
  "SignalJammer",
  "ComputerCore",
  "Thx",
  "Sickbay",
  "JumpDrive",
  "Railgun",
  "SubspaceField",
  "Transwarp"
];

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-addShortRangeComm">
      <p>
        Flux a system's power based on the system type, name, randomly, or all
        systems on a ship. If there are more than one of a type, you must
        specify the exact name of the system. Otherwise, it will flux a random
        system of that type. If a type and name are not specified, it will flux
        a single random system. If "All" is checked, it will flux all.
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

      <Label>
        All{" "}
        <Input
          type="checkbox"
          defaultChecked={args.all}
          onBlur={evt => updateArgs("all", evt.target.checked)}
        />
      </Label>
    </FormGroup>
  );
};
