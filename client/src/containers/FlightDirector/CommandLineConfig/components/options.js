import React from "react";
import PropTypes from "prop-types";

class Options extends React.Component {
  render() {
    const { value = "Stations", updateValue = () => {} } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Options</label>
        <select
          value={value}
          onChange={e => updateValue(e.target.value)}
          onMouseDown={e => e.stopPropagation()}
        >
          <option>Custom</option>
          <option>Stations</option>
        </select>
        {value !== "Stations" && (
          <textarea
            onMouseDown={e => {
              e.stopPropagation();
            }}
            value={value}
            onChange={e => updateValue(e.target.value)}
          />
        )}
        <small>Options which can be passed</small>
        <small>to the command. For custom,</small>
        <small>put each option on separate line.</small>
        <small>Options provide help text to the</small>
        <small>command.</small>
      </div>
    );
  }
}

Options.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Options",
  component: Options,
  outputs: [
    {
      id: "optionsValue",
      title: "Options which can be passed to the command",
      type: "Options",
      color: "limegreen"
    }
  ],
  inputs: [],
  config: []
};
