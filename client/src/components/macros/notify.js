import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { notifyComponents } from "../core/menubar/notificationConfig";

const colors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark"
];
export default props => {
  const { updateArgs, args, stations, clients } = props;

  return (
    <FormGroup
      className="macro-template"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <p>Send a notification to Core</p>
      <Label>
        Type
        <Input
          type="select"
          value={args.type || ""}
          onChange={e => updateArgs("type", e.target.value)}
        >
          <option value="" disabled>
            Select a type
          </option>
          {notifyComponents.map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Input>
      </Label>
      <Label>Station</Label>

      <Input
        type="select"
        value={args.station}
        onChange={e => updateArgs("station", e.target.value)}
      >
        <option value="Core">Core</option>
        {stations && stations.length > 0 && (
          <optgroup label="Stations">
            {stations.map(c => (
              <option value={c.name} key={c.name}>
                {c.name}
              </option>
            ))}
          </optgroup>
        )}
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
      <Label>
        Title
        <Input
          type="text"
          value={args.title}
          onChange={e => updateArgs("title", e.target.value)}
        />
      </Label>
      <Label>
        Body
        <Input
          type="textarea"
          value={args.body}
          onChange={e => updateArgs("body", e.target.value)}
        />
      </Label>
      <Label>
        Color
        <Input
          type="select"
          value={args.color}
          onChange={e => updateArgs("color", e.target.value)}
        >
          {colors.map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Input>
      </Label>
    </FormGroup>
  );
};
