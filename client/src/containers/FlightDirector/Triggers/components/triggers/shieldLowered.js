export default {
  name: "shieldLowered",
  category: "Triggers",
  component: () => "Event: Shield Lowered",
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
