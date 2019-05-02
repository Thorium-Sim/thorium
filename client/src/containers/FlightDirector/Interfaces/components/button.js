import React from "react";
import { Button, Input } from "reactstrap";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark"
];

export default {
  name: "Button",
  component: ({ value = {}, config = {} }) => {
    return (
      <Button
        style={{
          opacity: config.hidden ? 0.2 : 1
        }}
        color={config.color}
      >
        {config.label || config.objectLabel || "Button"}
      </Button>
    );
  },
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: [
    {
      id: "objectLabel",
      title: "Object Label",
      props: {
        type: "text"
      }
    },
    {
      id: "label",
      title: "Button Text",
      props: {
        type: "text"
      }
    },
    {
      id: "color",
      title: "Color",
      component: props => {
        return (
          <Input
            type="select"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          >
            {colors.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Input>
        );
      }
    },
    {
      id: "hidden",
      title: "Hidden",
      props: {
        type: "checkbox"
      }
    }
  ]
};
