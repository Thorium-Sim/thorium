import React from "react";
import PropTypes from "prop-types";
import { registerComponent } from "react-node-diagrams";
import ActionsMacro from "components/macros/triggerAction";

class Actions extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        <ActionsMacro
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
          noStations
        />
        <small>
          Unless station is specified, it will trigger on all bridge stations.
        </small>
      </div>
    );
  }
}

Actions.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

registerComponent({
  name: "triggerAction",
  category: "Outputs",
  component: Actions,
  outputs: [],
  inputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "stationId",
      title: "Station the action will be performed on",
      type: "Any"
    }
  ],
  config: []
});
