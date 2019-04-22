import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import FontAwesome from "react-fontawesome";
import uuid from "uuid";
const Checkbox = ({
  value = [],
  updateValue = () => {},
  options = [],
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
        return o;
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
      {options.map(o => (
        <FormGroup check key={`input-${o.id}`}>
          <Label check>
            <Input
              disabled={disabled}
              type="checkbox"
              name={o.id}
              checked={value && value.indexOf(o.id) > -1}
              onChange={e =>
                updateValue(
                  e.target.checked
                    ? value.concat(o.id).filter((b, i, a) => a.indexOf(b) === i)
                    : value.filter(f => f !== o.id)
                )
              }
            />
            {survey ? (
              o.label
            ) : (
              <span>
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
            )}
          </Label>
        </FormGroup>
      ))}
      {!survey && (
        <div
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={addOption}
        >
          <FontAwesome name="plus" /> Add an option
        </div>
      )}
    </div>
  );
};

export default Checkbox;
