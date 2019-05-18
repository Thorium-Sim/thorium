import React from "react";
import PropTypes from "prop-types";

class DelayedOutput extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Delayed Output</label>
        <textarea
          onMouseDown={e => {
            e.stopPropagation();
          }}
          value={value.text}
          onChange={e => updateValue({ ...value, text: e.target.value })}
        />
        <small>
          Every line will display one at a time, with the delay between each
          one.
        </small>
        <small>
          Use <code>#ARG1</code> and <code>#ARG1</code> for the command's
          arguments.
        </small>
        <label>Delay</label>
        <input
          onMouseDown={e => {
            e.stopPropagation();
          }}
          type="number"
          value={value.delay}
          onChange={e => updateValue({ ...value, delay: e.target.value })}
        />
        <small>How long in milliseconds between each line appearing.</small>
      </div>
    );
  }
}

DelayedOutput.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Delayed Output",
  component: DelayedOutput,
  outputs: [],
  inputs: [
    {
      id: "delayedOutput",
      title: "Output from the command",
      type: "Output",
      color: "skyblue"
    }
  ],
  config: []
};
