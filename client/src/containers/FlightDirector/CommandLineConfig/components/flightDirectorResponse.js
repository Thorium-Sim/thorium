import React from "react";
import PropTypes from "prop-types";

class FlightDirectorResponse extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Immediate Output</label>
        <textarea
          onMouseDown={e => {
            e.stopPropagation();
          }}
          value={value.text}
          onChange={e => updateValue({ ...value, text: e.target.value })}
        />
        <small>This is the value that will be written immediately.</small>
        <small>
          Use <code>#ARG1</code> and <code>#ARG1</code> for the command's
          arguments.
        </small>
        <label>Fallback Output</label>
        <textarea
          onMouseDown={e => {
            e.stopPropagation();
          }}
          value={value.fallback}
          onChange={e => updateValue({ ...value, fallback: e.target.value })}
        />
        <small>
          The value that will be written if there is no response from the flight
          director.
        </small>
        <label>Timeout (ms)</label>
        <input
          onMouseDown={e => {
            e.stopPropagation();
          }}
          type="number"
          value={value.timeout}
          onChange={e => updateValue({ ...value, timeout: e.target.value })}
        />
      </div>
    );
  }
}

FlightDirectorResponse.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Flight Director Response",
  component: FlightDirectorResponse,
  outputs: [
    {
      id: "trigger",
      title:
        "Connect to an action to trigger it when the flight director approves.",
      color: "orange",
      type: "Trigger"
    },
    {
      id: "output",
      title: "Output if approved by the flight director.",
      color: "skyblue",
      type: "Output"
    },
    {
      id: "error",
      title: "Output if denied by the flight director.",
      color: "skyblue",
      type: "Output"
    }
  ],
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
