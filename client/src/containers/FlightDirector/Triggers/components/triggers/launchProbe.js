export default {
  name: "launchProbe",
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
