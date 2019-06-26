import React from "react";
import { FormGroup } from "helpers/reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-template">
      <label>
        <input
          type="checkbox"
          checked={args.clamps}
          onChange={e => updateArgs("clamps", e.target.checked)}
        />{" "}
        Clamps
      </label>
      <label>
        <input
          type="checkbox"
          checked={args.ramps}
          onChange={e => updateArgs("ramps", e.target.checked)}
        />{" "}
        Ramps
      </label>
      <label>
        <input
          type="checkbox"
          checked={args.airlock}
          onChange={e => updateArgs("airlock", e.target.checked)}
        />{" "}
        Airlock
      </label>
      <label>
        <input
          type="checkbox"
          checked={args.legs}
          onChange={e => updateArgs("legs", e.target.checked)}
        />{" "}
        Legs
      </label>
      <small>
        Checked means attached and docked; unchecked means detached and ready
        for space travel
      </small>
    </FormGroup>
  );
};
