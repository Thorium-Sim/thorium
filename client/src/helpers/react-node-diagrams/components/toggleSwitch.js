import React from "react";
import style from "./toggleSwitch.module.css";

const ToggleSwitch = ({ value = false, updateValue = () => {} }) => {
  return (
    <div>
      <div
        className={style.switch}
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
          updateValue(!value);
        }}
      >
        <div className={`${style.toggle} ${value ? style.on : style.off}`} />
      </div>
    </div>
  );
};

export default {
  name: "ToggleSwitch",
  component: ToggleSwitch,
  outputs: [
    { id: "toggleValue", title: "Value of the component", type: "Boolean" }
  ],
  inputs: [],
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
