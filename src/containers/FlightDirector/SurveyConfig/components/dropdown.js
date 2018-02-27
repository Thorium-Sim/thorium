import React from "react";
import { Input } from "reactstrap";
import FontAwesome from "react-fontawesome";
import uuid from "uuid";
const Dropdown = ({
  value = "",
  updateValue = () => {},
  options = [],
  required,
  disabled,
  updateForm,
  id,
  survey
}) => {
  const updateLabel = (oId, uvalue) => {
    updateForm(
      id,
      "options",
      options.map(o => {
        if (o.id === oId) {
          return { ...o, label: uvalue };
        }
        return 0;
      })
    );
  };
  const addOption = () => {
    updateForm(
      id,
      "options",
      options.concat({
        id: uuid.v4(),
        label: "Option"
      })
    );
  };
  const removeOption = oId => {
    updateForm(id, "options", options.filter(o => o.id !== oId));
  };
  return (
    <div>
      <Input
        type="select"
        value={value}
        onChange={e => updateValue(e.target.value)}
        required={required}
        disabled={disabled}
      >
        <option value="" disabled>
          Select an option.
        </option>
        {options.map(o => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </Input>
      {!survey &&
        options.map(o => (
          <span key={`span-${o.id}`}>
            <Input
              type="text"
              value={o.label}
              onChange={e => updateLabel(o.id, e.target.value)}
            />
            <FontAwesome
              name="ban"
              className="text-danger"
              onClick={() => removeOption(o.id)}
            />
          </span>
        ))}
      {!survey && (
        <div
          class="text-primary"
          style={{ cursor: "pointer" }}
          onClick={addOption}
        >
          <FontAwesome name="plus" /> Add an option
        </div>
      )}
    </div>
  );
};

export default Dropdown;
