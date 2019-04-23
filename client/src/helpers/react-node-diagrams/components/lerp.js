import React, { Component } from "react";

import PropTypes from "prop-types";

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

class Lerp extends Component {
  startTime = 0;
  endTime = 0;
  time = 0;
  componentDidMount() {
    if (this.props.id) this.loop(0);
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.looping);
  }
  componentDidUpdate(prevProps) {
    const { inputs = [] } = this.props;
    const { inputs: oldInputs } = prevProps;
    const { duration = 1000, value1, value2 } = inputs || [];
    if (
      (value1 || value1 === 0) &&
      (value2 || value2 === 0) &&
      (value1 !== oldInputs.value1 || value2 !== oldInputs.value2)
    ) {
      this.startTime = this.time;
      this.endTime = this.time + duration;
    }
  }
  loop = time => {
    this.time = time;
    this.looping = window.requestAnimationFrame(this.loop);
    const { inputs, value, updateValue } = this.props;
    const { duration = 1000, value1, value2 } = inputs;
    if (this.endTime && time < this.endTime) {
      updateValue(lerp(value1, value2, (time - this.startTime) / duration));
    } else if (value !== value2) {
      updateValue(value2);
    }
  };
  render() {
    return <div>Lerp</div>;
  }
}

Lerp.propTypes = {
  id: PropTypes.string,
  inputs: PropTypes.array,
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "Lerp",
  component: Lerp,
  outputs: [{ id: "output", title: "Output of the Lerp", type: "Number" }],
  inputs: [
    {
      id: "duration",
      title: "Lerp duration in ms (1000ms default)",
      type: "Number",
      color: "yellow"
    },
    {
      id: "value1",
      title: "Starting Value",
      type: "Number",
      color: "#f86745"
    },
    {
      id: "value2",
      title: "Ending Value",
      type: "Number",
      color: "#F81543"
    }
  ],
  config: []
};
