import React, { Component } from "react";

class Divide extends Component {
  render() {
    return (
      <div>
        <span style={{ fontWeight: 800, fontSize: 32 }}>÷</span>
      </div>
    );
  }
}

export default {
  name: "Divide",
  component: Divide,
  category: "Operations",
  process: (comp, inputs) => {
    const { input1 = 1, input2 = 1 } = inputs;
    const parsed1 = parseFloat(input1);
    const parsed2 = parseFloat(input2) || 1;
    return parsed1 / parsed2;
  },
  inputs: [
    { id: "input1", title: "Input", type: "Any" },
    { id: "input2", title: "Input", type: "Any" }
  ],
  outputs: [{ id: "level", title: "Output", type: "Any" }],
  config: [
    {
      id: "label",
      title: "Label",
      props: {
        type: "text",
        placeholder: "Appears above component"
      }
    }
  ]
};
