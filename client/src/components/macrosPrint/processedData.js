import React from "react";
import { FormGroup, Input, Label } from "helpers/reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-setPresetAnswer">
      <div>
        <strong>Data </strong>
        <pre>{args && args.data}</pre>
        <Label>
          <Input type="checkbox" checked={args && args.flash} />
          Flash
        </Label>
      </div>
    </FormGroup>
  );
};
