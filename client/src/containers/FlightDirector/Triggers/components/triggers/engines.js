import React from "react";

export const setSpeed = {
  name: "setSpeed",
  label: "Engine Speed Change",
  objectKey: "setSpeed",
  category: "Triggers",
  component: () => (
    <div>
      Event: Set Speed
      <div>
        <small>
          Use 'Engine' to differentiate between engine names or 'Full Stop'.
        </small>
      </div>
    </div>
  ),
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "engine",
      color: "green",
      title: "Engine",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
