import React, { Component } from "react";
import { findDOMNode } from "react-dom";

/*const sinPoints = ({ frequency = 0, amplitude = 0, width, height }) => {
  let sinHeight = height * 2 * 2;
  return Array(Math.round(sinHeight))
    .fill(0)
    .map((_, i) => {
      if (i % 2 === 1) return i / 2;
      return Math.sin(i / 2 / frequency) * amplitude + width / 2;
    });
};*/

export default class FrequencySignals extends Component {
  state = {};
  componentDidMount() {
    const el = findDOMNode(this);
    this.setState({
      height: el.parentElement.getBoundingClientRect().height
    });
  }
  render() {
    const { dimensions /*, frequency, amplitude*/ } = this.props;
    // const height = this.state.height || 0;
    if (dimensions.width === 0) return <div />;
    return <div />;
    /*<Stage width={dimensions.width} height={height}>
        <Layer>
          <Line
            points={sinPoints({
              frequency: Math.pow(10, 1 - frequency) + 2,
              amplitude: amplitude * dimensions.width / 3 + 10,
              height: height,
              width: dimensions.width
            })}
            stroke="green"
            strokeWidth={4}
            lineJoin="round"
            lineCap="round"
          />
        </Layer>
      </Stage>*/
  }
}
