import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ViewscreenComponentSelector } from "./updateViewscreenComponent";

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
      <Label>Position</Label>

      <Input
        type="select"
        value={args.position || ""}
        onChange={e => updateArgs("position", e.target.value)}
      >
        <option value={"bottomRight"}>Bottom Right</option>
        <option value={"topRight"}>Top Right</option>
        <option value={"bottomLeft"}>Bottom Left</option>
        <option value={"topLeft"}>Top Left</option>
        <option value={"center"}>Center</option>
      </Input>
      <Label>Size</Label>

      <Input
        type="select"
        value={args.size || "medium"}
        onChange={e => updateArgs("size", e.target.value)}
      >
        <option value={"small"}>Small</option>
        <option value={"medium"}>Medium</option>
        <option value={"large"}>Large</option>
      </Input>

      <ViewscreenComponentSelector
        args={{ ...args, data: JSON.stringify(args.data) }}
        updateArgs={(key, value) =>
          key === "data"
            ? updateArgs(key, JSON.parse(value))
            : updateArgs(key, value)
        }
      />
    </FormGroup>
  );
};
