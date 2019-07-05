export const launchProbe = {
  name: "launchProbe",
  label: "Launch Probe",
  category: "Triggers",
  component: () => "Event: Launch Probe",
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: []
};

export const probeProcessedData = {
  name: "probeProcessedData",
  label: "Probe Processed Data",
  objectKey: "triggerprobeProcessedData",
  category: "Triggers",
  component: () => "Event: Probe Processed Data",
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: []
};
