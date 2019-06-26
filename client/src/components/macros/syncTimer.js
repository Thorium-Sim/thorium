import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args, client }) => {
  const [hours, minutes, seconds] = args.time
    ? args.time.split(":")
    : [0, 0, 0];
  const updateTime = (time, which) => {
    if (which === "hours") {
      updateArgs("time", `${time}:${minutes}:${seconds}`);
    }
    if (which === "minutes") {
      updateArgs("time", `${hours}:${time}:${seconds}`);
    }
    if (which === "seconds") {
      updateArgs("time", `${hours}:${minutes}:${time}`);
    }
  };
  return (
    <div>
      <p>Performs the action on all stations in the simulator.</p>
      <FormGroup className="macro-setTimer">
        <Label>Hours</Label>
        <Input
          type="number"
          value={hours}
          onChange={e => updateTime(e.target.value, "hours")}
        />
        <Label>Minutes</Label>
        <Input
          type="number"
          value={minutes}
          onChange={e => updateTime(e.target.value, "minutes")}
        />
        <Label>Seconds</Label>
        <Input
          type="number"
          value={seconds}
          onChange={e => updateTime(e.target.value, "seconds")}
        />
        <Label>
          <Input
            type="checkbox"
            checked={args.active}
            onChange={e => updateArgs("active", e.target.checked)}
          />
          Activate Timer
        </Label>
      </FormGroup>
    </div>
  );
};
