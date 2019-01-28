import React from "react";
import PropTypes from "prop-types";

class CancelRepeatingSounds extends React.Component {
  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        Cancel Looping Sounds
      </div>
    );
  }
}

CancelRepeatingSounds.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "cancelLoopingSounds",
  category: "Actions",
  component: CancelRepeatingSounds,
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
