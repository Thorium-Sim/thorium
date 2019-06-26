import React from "react";
import PropTypes from "prop-types";
import UnhideSimulatorCard from "components/macros/unhideSimulatorCard";

class UnhideCard extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        <UnhideSimulatorCard
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
        />
        <small>Card Name can be identified through the connection.</small>
      </div>
    );
  }
}

UnhideCard.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "unhideSimulatorCard",
  category: "Actions",
  component: UnhideCard,
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
    }
  ],
  config: []
};
