import React from "react";
import PropTypes from "prop-types";
import ChangeAlertLevel from "components/macros/changeSimulatorAlertLevel";

class SimulatorAlertLevel extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        <ChangeAlertLevel
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
        />
        <small>Alert Level can be identified through the connection.</small>
      </div>
    );
  }
}

SimulatorAlertLevel.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "changeSimulatorAlertLevel",
  category: "Actions",
  component: SimulatorAlertLevel,
  outputs: [],
  inputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "alertLevel",
      color: "rebeccapurple",
      title: "The alert number, between 1 and 5",
      type: "Any"
    }
  ],
  config: []
};
