import React, { Component } from "react";
import { findDOMNode } from "react-dom";

const sinPoints = ({ frequency = 0, amplitude = 0, width, height }) => {
  let sinHeight = height * 2 * 2;
  return Array(Math.round(sinHeight))
    .fill(0)
    .map((_, i) => {
      if (i % 2 === 1) return i / 2;
      return Math.sin(i / 2 / frequency) * amplitude + width / 2;
    });
};

export default class FrequencySignals extends Component {
  state = {};
  componentDidMount() {
    const el = findDOMNode(this);
    this.setState({
      height: el.parentElement.getBoundingClientRect().height
    });
  }
  render() {
    const { dimensions, frequency, amplitude } = this.props;
    if (dimensions.width === 0) return <div />;
    return (
      <svg
        key={"short-range-line"}
        style={{ height: "100%", width: dimensions.width }}
      >
        <path
          d={sinPoints({
            frequency: Math.pow(10, 1 - frequency) + 2,
            amplitude: amplitude * dimensions.width / 3 + 10,
            height: dimensions.height,
            width: dimensions.width
          }).reduce(
            (prev, next, index) =>
              prev + `${index % 2 === 0 ? "L" : ""} ${next} `,
            `M ${dimensions.width / 2} 0 `
          )}
          fill="transparent"
          stroke="green"
          strokeWidth={2}
        />
      </svg>
    );
  }
}
