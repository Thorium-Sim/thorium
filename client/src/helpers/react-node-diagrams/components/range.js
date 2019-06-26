import React from "react";

import PropTypes from "prop-types";

const Range = ({ value = "", updateValue = () => {} }) => {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      onMouseDown={e => {
        e.stopPropagation();
      }}
      defaultValue={value}
      onChange={e => {
        e.preventDefault();
        updateValue(parseFloat(e.target.value));
      }}
    />
  );
};

Range.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Range",
  component: Range,
  outputs: [
    { id: "rangeValue", title: "Value of the component", type: "Number" }
  ],
  inputs: [],
  config: [
    {
      id: "label",
      title: "Label",
      props: {
        type: "text",
        placeholder: "Appears above component"
      }
    }
  ]
};
