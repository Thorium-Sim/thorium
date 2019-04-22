import React from "react";
import { Button } from "reactstrap";

export default {
  name: "Button",
  component: ({ value = {}, config = {} }) => {
    return (
      <Button
        style={{
          opacity: config.hidden ? 0.2 : 1
        }}
      >
        {config.objectLabel || "Button"}
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
      title: "Button Text",
      props: {
        type: "text"
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
