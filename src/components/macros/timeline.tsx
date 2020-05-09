import React from "react";
import {MacroConfigProps} from "helpers/genericTypes";
import {Label, FormGroup, Input} from "reactstrap";
import {capitalCase} from "change-case";
import {useMissionMacrosQuery} from "generated/graphql";
const colors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

const SetSimulatorMission: React.FC<MacroConfigProps> = ({
  updateArgs,
  args,
  id,
}) => {
  const {data} = useMissionMacrosQuery();
  const missions = data?.missions || [];
  const selectedMission = missions.find(m => m.id === args.missionId);
  return (
    <FormGroup className="macro-template" key={id}>
      <div>
        <Label>
          Mission
          <Input
            type="select"
            value={args.missionId || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateArgs("stepId", null);
              updateArgs("missionId", e.target.value);
            }}
          >
            <option value={""} disabled>
              Choose a mission
            </option>
            {Object.entries(
              missions.reduce(
                (prev: {[key: string]: typeof missions}, next) => {
                  if (next.category) {
                    prev[next.category] = prev[next.category]
                      ? prev[next.category].concat(next)
                      : [next];
                    return prev;
                  }
                  prev[""] = prev[""] ? prev[""].concat(next) : [next];
                  return prev;
                },
                {},
              ),
            ).map(([category, missions]) => (
              <optgroup key={category} label={category}>
                {missions.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </Input>
        </Label>
      </div>
      <div>
        <Label>
          Step (optional)
          <Input
            type="select"
            value={args.stepId || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateArgs("stepId", e.target.value)
            }
          >
            <option value={""} disabled>
              Choose a step
            </option>
            {selectedMission?.timeline.map((t, i) => (
              <option key={t.id} value={t.id}>
                {i + 1} - {t.name}
              </option>
            ))}
          </Input>
        </Label>
      </div>
      <div>
        <Label>
          Label
          <Input
            type="text"
            value={args.label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateArgs("label", e.target.value)
            }
          />
          <small>Use for branching timeline buttons</small>
        </Label>
      </div>
      <div>
        <Label>
          Button Color
          <Input
            type="select"
            value={args.color}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateArgs("color", e.target.value)
            }
          >
            {colors.map(c => (
              <option key={c} value={c}>
                {capitalCase(c)}
              </option>
            ))}
          </Input>
          <small>Use for branching timeline buttons</small>
        </Label>
      </div>
    </FormGroup>
  );
};

export const setSimulatorMission = SetSimulatorMission;
