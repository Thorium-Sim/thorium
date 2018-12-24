export default {
  name: "shieldRaised",
  category: "Triggers",
  component: () => "Event: Shield Raised",
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
