import React from "react";

export default {
  name: "Toggle",
  component: ({ value = {}, config = {}, updateValue = () => {} }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          className="switch no-inline"
          style={{
            opacity: config.hidden ? 0.2 : 1
          }}
          onClick={() =>
            updateValue({ ...value, level: value.level === 1 ? 0 : 1 })
          }
        >
          <div className={`toggle ${value.level === 1 ? "on" : "off"}`} />
        </div>
        <label>{config.objectLabel}</label>
      </div>
    );
  },
  outputs: [
    {
      id: "triggerOut-up",
      color: "orange",
      title: "Triggers an action when the switch moves up",
      type: "Trigger"
    },
    {
      id: "triggerOut-down",
      color: "orange",
      title: "Triggers an action when the switch moves down",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: [
    {
      id: "objectLabel",
      title: "Toggle Text",
      props: {
        type: "text"
      }
    },
    {
      id: "hidden",
      title: "Hidden",
      props: {
        type: "checkbox"
      }
    }
  ]
};
