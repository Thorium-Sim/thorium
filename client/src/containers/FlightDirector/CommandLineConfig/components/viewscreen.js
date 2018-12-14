import React from "react";
import PropTypes from "prop-types";
import { registerComponent } from "react-node-diagrams";
import ViewscreenMacro from "components/macros/updateViewscreenComponent";

class Viewscreen extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "50vh",
          maxWidth: "20vw",
          overflowY: "auto"
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        <ViewscreenMacro
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
        />
      </div>
    );
  }
}

Viewscreen.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

registerComponent({
  name: "updateViewscreenComponent",
  category: "Outputs",
  component: Viewscreen,
  outputs: [],
  inputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  config: []
});
