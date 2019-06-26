import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  const { value = "", updateValue = () => {} } = props;
  return (
    <input
      onMouseDown={e => {
        e.stopPropagation();
      }}
      value={value}
      onChange={e => updateValue(e.target.value)}
    />
  );
};

Input.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Input",
  component: Input,
  outputs: [{ id: "inputValue", title: "Value of the component", type: "Any" }],
  inputs: [],
  config: [
    {
      id: "label",
      title: "Label",
      props: {
        type: "text",
        placeholder: "Appears above component"
      }
    },
    {
      id: "test",
      title: "test",
      props: {
        type: "checkbox"
      }
    }
  ]
};
