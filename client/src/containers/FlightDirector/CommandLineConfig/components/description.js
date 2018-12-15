import React from "react";
import PropTypes from "prop-types";
import { registerComponent } from "react-node-diagrams";

class Description extends React.Component {
  render() {
    const { value = "", updateValue = () => {} } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Description</label>
        <textarea
          onMouseDown={e => {
            e.stopPropagation();
          }}
          value={value}
          onChange={e => updateValue(e.target.value)}
        />
        <small>Connect to a command to provide</small>
        <small>help text.</small>
      </div>
    );
  }
}

Description.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

registerComponent({
  name: "Description",
  component: Description,
  outputs: [
    {
      id: "optionsValue",
      title: "Description for a command",
      type: "Description",
      color: "goldenrod"
    }
  ],
  inputs: [],
  config: []
});
