import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import * as ViewscreenCards from "components/viewscreens";

const cards = Object.keys(ViewscreenCards)
  .filter(c => c.indexOf("Config") === -1)
  .sort();
const configs = Object.keys(ViewscreenCards)
  .filter(c => c.indexOf("Config") > -1)
  .sort();
export default ({ updateArgs, args }) => {
  return (
    <FormGroup className="macro-template">
      <div>
        <Label>
          Secondary Screen?{" "}
          <input
            type="checkbox"
            checked={args.secondary}
            onChange={evt => updateArgs("secondary", evt.target.checked)}
          />
        </Label>
      </div>
      <Label>Cards</Label>
      <Input
        type="select"
        value={args.component}
        onChange={evt => updateArgs("component", evt.target.value)}
      >
        {cards.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Input>
      <Label>
        Config <small>Use #SIM for the name of the simulator</small>
      </Label>
      {(() => {
        if (args.component && configs.indexOf(`${args.component}Config`) > -1) {
          const ConfigComponent = ViewscreenCards[`${args.component}Config`];
          return (
            <ConfigComponent
              data={args.data || "{}"}
              updateData={data => updateArgs("data", data)}
            />
          );
        }
      })()}
    </FormGroup>
  );
};
