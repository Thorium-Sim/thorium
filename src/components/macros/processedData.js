import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-setPresetAnswer">
      <Label>Domain</Label>
      <Input
        type="select"
        value={args.domain}
        onChange={evt => updateArgs("domain", evt.target.value)}
      >
        <option value={null}>Pick a Domain</option>
        <option value="external">External</option>
        <option value="internal">Internal</option>
      </Input>
      <Label>Data</Label>
      <Input
        type="textarea"
        rows={8}
        defaultValue={args.data}
        onBlur={evt => updateArgs("data", evt.target.value)}
      />
    </FormGroup>
  );
};
