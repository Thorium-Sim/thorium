import React from "react";

export default function actionHelper(
  name,
  Comp,
  message = "",
  props = {},
  inputs = []
) {
  const Component = ({ value = {}, updateValue = () => {} }) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        <Comp
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
          {...props}
        />
        <small>{message}</small>
      </div>
    );
  };
  return {
    name,
    hiddenInLibrary: true,
    category: "Actions",
    component: Component,
    outputs: [],
    inputs: [
      {
        id: "trigger",
        color: "orange",
        title: "Triggers the action",
        type: "Trigger"
      },
      ...inputs
    ],
    config: [
      {
        id: "delay",
        title: "Delay",
        props: {
          type: "number",
          placeholder: "Delay in milliseconds"
        }
      }
    ]
  };
}
