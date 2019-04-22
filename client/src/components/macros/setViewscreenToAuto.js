import React from "react";
import { FormGroup, Label } from "reactstrap";

export default ({ updateArgs, args = {} }) => {
  return (
    <FormGroup className="macro-template">
      <Label>
        Secondary Screen?{" "}
        <input
          type="checkbox"
          checked={args && args.secondary}
          onChange={evt => updateArgs("secondary", evt.target.checked)}
        />
      </Label>
    </FormGroup>
  );
};
