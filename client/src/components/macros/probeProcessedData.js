import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args }) => {
  return (
    <FormGroup className="macro-setPresetAnswer">
      <Label>
        Data{" "}
        <small>Use #SIM in your message for the name of the simulator</small>
      </Label>
      <Input
        type="textarea"
        rows={8}
        defaultValue={args.data}
        onBlur={evt => updateArgs("data", evt.target.value)}
      />
      <Label>
        <Input
          type="checkbox"
          defaultChecked={args.flash}
          onChange={evt => updateArgs("flash", evt.target.checked)}
        />
        Flash
      </Label>
    </FormGroup>
  );
};
