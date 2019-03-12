import React from "react";
import PropTypes from "prop-types";
import PlaySoundComp from "components/macros/playSound";

class PlaySound extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        <PlaySoundComp
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
          noStations
        />
      </div>
    );
  }
}

PlaySound.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "playSound",
  category: "Actions",
  hiddenInLibrary: true,

  component: PlaySound,
  outputs: [],
  inputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
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
