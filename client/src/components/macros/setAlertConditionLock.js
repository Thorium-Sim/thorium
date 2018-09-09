import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args }) => {
  return (
    <FormGroup className="macro-setAlertConditionLock">
      <Label>
        <Input
          type="checkbox"
          defaultValue={args.lock}
          onChange={evt => updateArgs("lock", evt.target.checked)}
        />
        Locked
      </Label>
    </FormGroup>
  );
};
