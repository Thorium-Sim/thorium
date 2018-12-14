import React from "react";
import PropTypes from "prop-types";
import { registerComponent } from "react-node-diagrams";

const Command = props => {
  const { value = "", updateValue = () => {} } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Command</label>
      <input
        onMouseDown={e => {
          e.stopPropagation();
        }}
        value={value}
        onChange={e => updateValue(e.target.value.replace(/\s/gi, ""))}
      />
      <small>The command that will be</small>
      <small>typed in to perform the action.</small>
    </div>
  );
};

Command.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

registerComponent({
  name: "Command",
  component: Command,
  outputs: [
    {
      id: "trigger",
      title:
        "Connect to an action to trigger it when the command is activated.",
      color: "orange",
      type: "Trigger"
    },
    {
      id: "argument1",
      title: "The first additional option typed after the command",
      color: "rebeccapurple",
      type: "Argument"
    },
    {
      id: "argument2",
      title: "The second additional option typed after the command",
      color: "purple",
      type: "Argument"
    }
  ],
  inputs: [
    {
      id: "options",
      title: "Options",
      type: "Options",
      color: "limegreen"
    },
    {
      id: "description",
      title: "Description",
      type: "Description",
      color: "goldenrod"
    }
  ],
  config: [
    {
      id: "hidden",
      title: "Hidden",
      props: {
        type: "checkbox"
      }
    }
  ]
});
