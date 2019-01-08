import React from "react";

export const sensorScanRequest = {
  name: "sensorScanRequest",
  category: "Triggers",
  component: () => (
    <div>
      Event: New Sensor Scan
      <div>
        <small>
          Request will be fuzzy-matched with connected switch values
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
      id: "request",
      color: "brown",
      title: "Request",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
