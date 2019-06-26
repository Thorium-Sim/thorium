import React from "react";
import PropTypes from "prop-types";
import HideSimulatorCard from "components/macros/hideSimulatorCard";

class HideCard extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        <HideSimulatorCard
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
        />
        <small>Card Name can be identified through the connection.</small>
      </div>
    );
  }
}

HideCard.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "hideSimulatorCard",
  category: "Actions",
  component: HideCard,
  outputs: [],
  inputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "cardName",
      color: "rebeccapurple",
      title: "The name of the card",
      type: "Any"
    },
    {
      id: "delay",
      color: "rebeccapurple",
      title: "The delay to return the card.",
      type: "Any"
    }
  ],
  config: []
};
