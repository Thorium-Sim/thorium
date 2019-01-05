export default {
  name: "firePhaserBeam",
  category: "Triggers",
  component: () => "Event: Phasers Fired",
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
