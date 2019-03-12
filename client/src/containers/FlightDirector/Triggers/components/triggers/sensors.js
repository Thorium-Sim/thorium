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

export const triggerProcessedData = {
  name: "processedData",
  label: "Processed Sensor Data",
  objectKey: "triggerProcessedData",
  category: "Triggers",
  component: () => (
    <div>
      Event: Processed Sensor Data
      <div>
        <small>
          Request will be fuzzy-matched with connected switch values. If data is
          sent with a flash, flash will be "yes".
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
      id: "data",
      color: "brown",
      title: "Data",
      type: "String"
    },
    {
      id: "flash",
      color: "yellow",
      title: "Flash",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
