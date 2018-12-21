export default {
  name: "torpedoFire",
  category: "Triggers",
  component: () => "Torpedo Fired",
  outputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "type",
      color: "green",
      title: "Torpedo Type",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
