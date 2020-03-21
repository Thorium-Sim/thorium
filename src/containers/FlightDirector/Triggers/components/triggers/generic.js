import React from "react";

export const generic = {
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
      type: "Trigger",
    },
    {
      id: "key",
      color: "green",
      title: "Key",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};

export const changeSimulatorAlertLevel = {
  name: "changeSimulatorAlertLevel",
  label: "Alert Level",
  objectKey: "changeSimulatorAlertLevel",
  category: "Triggers",
  component: () => (
    <div>
      Event: Alert Level
      <div>
        <small>Use 'Alert Level' for the alert levels 1 - 5.</small>
      </div>
    </div>
  ),
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger",
    },
    {
      id: "alertLevel",
      color: "green",
      title: "Alert Level",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};
