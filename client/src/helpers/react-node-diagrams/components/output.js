import React from "react";
import PropTypes from "prop-types";

function stringify(data) {
  let cache = [];
  const output = JSON.stringify(data, function(key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null;
  return output;
}

const Output = ({ value }) => {
  return <div>{typeof value === "object" ? stringify(value) : value}</div>;
};

Output.propTypes = {
  value: PropTypes.any
};

export default {
  name: "Output",
  component: Output,
  process: (comp, inputs) => {
    return inputs.outputValue;
  },
  inputs: [{ id: "outputValue", title: "Value to be displayed", type: "Any" }],
  outputs: [],
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
