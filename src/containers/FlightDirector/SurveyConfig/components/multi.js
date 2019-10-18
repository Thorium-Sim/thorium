import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import uuid from "uuid";
import {FaBan, FaPlus} from "react-icons/fa";
const Multi = ({
  value = "",
  updateValue = () => {},
  options = [],
  disabled,
  id,
  updateForm,
  survey,
}) => {
  const updateLabel = (oId, uvalue) => {
    updateForm(
      id,
      "options",
      options.map(o => {
        if (o.id === oId) {
          return {...o, label: uvalue};
        }
        return o;
      }),
    );
  };
  const addOption = () => {
    updateForm(
      id,
      "options",
      options.concat({
        id: uuid.v4(),
        label: "Option",
      }),
    );
  };
  const removeOption = oId => {
    updateForm(id, "options", options.filter(o => o.id !== oId));
  };
  return (
    <div>
      {options.map(o => (
        <FormGroup check key={o.id}>
          <Label check>
            <Input
              type="radio"
              name={o.id}
              checked={value === o.id}
              onChange={() => updateValue(o.id)}
              disabled={disabled}
            />{" "}
            {survey ? (
              o.label
            ) : (
              <span>
                <Input
                  type="text"
                  value={o.label}
                  onChange={e => updateLabel(o.id, e.target.value)}
                />
                <FaBan
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
          style={{cursor: "pointer"}}
          onClick={addOption}
        >
          <FaPlus /> Add an option
        </div>
      )}
    </div>
  );
};

export default Multi;
