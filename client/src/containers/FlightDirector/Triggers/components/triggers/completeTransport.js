export default {
  name: "completeTransport",
  category: "Triggers",
  component: () => "Event: Transport Complete",
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
