import React from "react";

export const reactorChangeEfficiency = {
  name: "reactorChangeEfficiency",
  category: "Triggers",
  component: () => (
    <div>
      Event: Reactor Efficiency Change
      <div>
        <small>Efficiency is a number between 0 and 1.0</small>
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
      id: "efficiency",
      color: "red",
      title: "Efficiency",
      type: "Number"
    }
  ],
  inputs: [],
  config: []
};
