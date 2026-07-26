import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";

export default ({updateArgs, args}) => {
  const value =
    args.enabled === true ? "online" : args.enabled === false ? "offline" : "";
  return (
    <FormGroup className="macro-setFabricationEnabled">
      <p>
        Take the ship's fabricator offline (jobs already running keep going,
        but no new jobs can start) or bring it back online.
      </p>
      <Label>Fabricator Status</Label>
      <Input
        type="select"
        value={value}
        onChange={evt => updateArgs("enabled", evt.target.value === "online")}
      >
        <option value="" disabled>
          Pick a status
        </option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </Input>
    </FormGroup>
  );
};
