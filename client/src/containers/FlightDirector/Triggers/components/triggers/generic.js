import React from "react";

export default {
  name: "genericTrigger",
  label: "Generic Trigger",
  objectKey: "generic",
  category: "Triggers",
  component: () => (
    <div>
      Event: Generic
      <div>
        <small>Use 'key' to differentiate different actions.</small>
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
      id: "key",
      color: "green",
      title: "Key",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
