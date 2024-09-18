import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import * as ViewscreenCards from "components/viewscreens";

const cards = Object.keys(ViewscreenCards)
  .filter(c => c.indexOf("Config") === -1)
  .sort();
const configs = Object.keys(ViewscreenCards)
  .filter(c => c.indexOf("Config") > -1)
  .sort();
export function ViewscreenComponentSelector({args, updateArgs, tacticalMaps}) {
  return (
    <>
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
              inputTacticalMaps={tacticalMaps}
            />
          );
        }
      })()}
    </>
  );
}

const parseActions = ({timelineItems}) => {
  return timelineItems.map(t => ({...t, args: JSON.parse(t.args)}));
};

export default ({updateArgs, args, clients, steps = []}) => {
  const tacticalMaps = steps
    .reduce((acc, step) => {
      const actions = parseActions(step);
      return acc.concat(
        actions
          .filter(e => e.event === "addTacticalMapsToFlight")
          .map(e => e.args.mapIds),
      );
    }, [])
    .reduce((acc, next) => acc.concat(next), []);
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
      </div>
      <ViewscreenComponentSelector
        args={args}
        updateArgs={updateArgs}
        tacticalMaps={tacticalMaps}
      />
    </FormGroup>
  );
};
