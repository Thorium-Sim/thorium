import React, { Component } from "react";
import { ChromePicker } from "react-color";
import PropTypes from "prop-types";

class Color extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.value === nextProps.value) {
      return false;
    }
    return true;
  }
  handleChange = color => {
    const { r, g, b } = color.rgb;
    const value = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    this.props.updateValue(value);
  };
  render() {
    const { value } = this.props;
    return (
      <div
        className="clickable"
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ChromePicker color={value} onChange={this.handleChange} />
      </div>
    );
  }
}

Color.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Color",
  component: Color,
  process: (comp, { red, green, blue }) => {
    if (red || green || blue || red === 0 || green === 0 || blue === 0) {
      return `rgb(${Math.round(red * 255) || 0}, ${Math.round(green * 255) ||
        0}, ${Math.round(blue * 255) || 0})`;
    }
    return comp.value;
  },
  outputs: [{ id: "color", title: "Component Color Output", type: "Any" }],
  inputs: [
    {
      id: "red",
      title: "Red Color [0-255]",
      type: "Number",
      color: "rgba(255,0,0,0.5)"
    },
    {
      id: "green",
      title: "green Color [0-255]",
      type: "Number",
      color: "rgba(0,255,0,0.5)"
    },
    {
      id: "blue",
      title: "blue Color [0-255]",
      type: "Number",
      color: "rgba(0,0,255,0.5)"
    }
  ],
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
