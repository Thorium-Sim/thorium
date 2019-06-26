import React from "react";

export default {
  name: "Switch",
  component: () => <div style={{ fontWeight: 800, fontSize: 32 }}>⑂</div>,
  outputs: [
    {
      id: "triggerOut",
      title: "Trigger",
      type: "Trigger",
      color: "orange"
    }
  ],
  inputs: [
    {
      id: "trigger",
      title: "Trigger",
      type: "Trigger",
      color: "orange"
    },
    {
      id: "check",
      title: "Check Input",
      type: "Any"
    }
  ],
  config: [
    {
      id: "label",
      title: "Label",
      props: {
        type: "text",
        placeholder: "Appears above component"
      }
    },
    {
      id: "check",
      title: "Correct Value",
      props: {
        type: "text",
        placeholder: "true input if check input matches"
      }
    }
  ]
};
