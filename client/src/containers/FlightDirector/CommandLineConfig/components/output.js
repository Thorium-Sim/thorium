import React from "react";
import PropTypes from "prop-types";

class Output extends React.Component {
  render() {
    const { value = "", updateValue = () => {} } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Output</label>
        <textarea
          onMouseDown={e => {
            e.stopPropagation();
          }}
          value={value}
          onChange={e => updateValue(e.target.value)}
        />
        <small>This is the value that will be written.</small>
        <small>
          Use <code>#ARG</code> for the command's argument.
        </small>
      </div>
    );
  }
}

Output.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Output",
  component: Output,
  outputs: [],
  inputs: [
    {
      id: "output",
      title: "Output from the command",
      type: "Output",
      color: "skyblue"
    }
  ],
  config: []
};
