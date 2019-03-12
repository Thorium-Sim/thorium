import React from "react";
import PropTypes from "prop-types";

class CancelAllSounds extends React.Component {
  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        Stop All Sounds
      </div>
    );
  }
}

CancelAllSounds.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "stopAllSounds",
  category: "Actions",
  hiddenInLibrary: true,

  component: CancelAllSounds,
  outputs: [],
  inputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  config: [
    {
      id: "delay",
      title: "Delay",
      props: {
        type: "number",
        placeholder: "Delay in milliseconds"
      }
    }
  ]
};
