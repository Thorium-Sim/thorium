import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args = {}, clients }) => {
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
      <Label>Station</Label>

      <Input
        type="select"
        value={args.id || ""}
        onChange={e => updateArgs("id", e.target.value)}
      >
        <option value={""}>Use Secondary Checkbox</option>
        {clients && clients.length > 0 && (
          <optgroup label="Clients">
            {clients.map(c => (
              <option value={c.id} key={c.id}>
                {c.id}
              </option>
            ))}
          </optgroup>
        )}
      </Input>
    </FormGroup>
  );
};
