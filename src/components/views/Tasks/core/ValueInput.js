import React from "react";
import {Input} from "helpers/reactstrap";
import {capitalCase} from "change-case";
import DeckSelect from "./inputs/DeckSelect";
import PartsPicker from "./inputs/PartsPicker";
import DamageTeamPicker from "./inputs/DamageTeamPicker";
import ProbeEquipment from "./inputs/ProbeEquipment";
import InventoryInput from "./inputs/InventoryInput";

const ValueInput = ({
  label,
  type,
  placeholder = "",
  value,
  definitionValue,
  onBlur,
  simulatorId = "null",
}) => {
  return (
    <div>
      {(() => {
        if (type === "text")
          return (
            <label>
              {capitalCase(label)}
              <Input
                type="text"
                placeholder={placeholder || definitionValue}
                defaultValue={value}
                onBlur={e => onBlur(e.target.value)}
              />
            </label>
          );
        if (type === "textarea")
          return (
            <label>
              {capitalCase(label)}
              <Input
                type="textarea"
                rows={3}
                placeholder={placeholder || definitionValue}
                defaultValue={value}
                onBlur={e => onBlur(e.target.value)}
              />
            </label>
          );
        if (type === "roomPicker") {
          return (
            <label>
              {capitalCase(label)}
              <DeckSelect
                simulatorId={simulatorId}
                value={value || placeholder}
                onChange={onBlur}
              />
            </label>
          );
        }
        if (type === "deckPicker") {
          return (
            <label>
              {capitalCase(label)}
              <DeckSelect
                simulatorId={simulatorId}
                value={value || placeholder}
                onChange={onBlur}
                deckOnly
              />
            </label>
          );
        }
        if (type === "partsPicker") {
          return (
            <label>
              {capitalCase(label)}
              <PartsPicker value={value} onChange={onBlur} />
            </label>
          );
        }
        if (type === "damageTeamPicker") {
          return (
            <label>
              {capitalCase(label)}
              <DamageTeamPicker
                simulatorId={simulatorId}
                value={value || placeholder}
                onChange={onBlur}
              />
            </label>
          );
        }
        if (type === "probeEquipment") {
          return (
            <label>
              {capitalCase(label)}
              <ProbeEquipment
                simulatorId={simulatorId}
                value={value || placeholder}
                onChange={onBlur}
              />
            </label>
          );
        }
        if (type === "inventoryInput") {
          return (
            <label>
              {capitalCase(label)}
              <InventoryInput
                simulatorId={simulatorId}
                value={value || placeholder}
                onChange={onBlur}
              />
            </label>
          );
        }
        if (typeof type === "object" && type.length > 0) {
          return (
            <label>
              {capitalCase(label)}
              <Input
                type="select"
                value={value || ""}
                onChange={e => onBlur(e.target.value)}
              >
                <option value={""}>Select one</option>
                {type.map(v => (
                  <option key={`${v.label}-${v.value}`} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </Input>
            </label>
          );
        }
        if (typeof type === "object")
          return (
            <label>
              {capitalCase(label)}
              <small>{type.placeholder}</small>
              <Input
                {...type}
                defaultValue={value}
                placeholder={value || placeholder}
                onBlur={e => onBlur(e.target.value)}
              />
            </label>
          );
        return (
          <label>
            {capitalCase(label)}
            <div>Invalid input type</div>
          </label>
        );
      })()}
    </div>
  );
};

export default ValueInput;
