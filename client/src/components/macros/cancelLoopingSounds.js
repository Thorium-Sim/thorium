import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default function cancelLooping({ updateArgs, args, stations, clients }) {
  if (!args.station) {
    updateArgs("station", "Sound");
  }
  return (
    <div>
      <FormGroup className="macro-PlaySound">
        <Label>Sound Player</Label>

        <Input
          type="select"
          value={args.station}
          onChange={e => updateArgs("station", e.target.value)}
        >
          <optgroup label="Generic Players">
            <option value="Sound">Sound Player</option>
            <option value="all">All Stations</option>
            <option value="random">Random Station</option>
            <option value="ECS">ECS</option>
          </optgroup>
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
      </FormGroup>
    </div>
  );
}
