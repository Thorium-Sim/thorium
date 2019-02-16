import React from "react";
import { Button } from "reactstrap";
export default {
  name: "Button",
  component: ({ value = {}, config = {} }) => {
    return <Button>{config.buttonText || "Button"}</Button>;
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
      id: "buttonText",
      title: "Button Text",
      props: {
        type: "text"
      }
    }
  ]
};
