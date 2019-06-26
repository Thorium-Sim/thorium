import React, { Component } from "react";

import PropTypes from "prop-types";

class Oscillator extends Component {
  inverval = 30;
  componentDidMount() {
    if (this.props.id) this.loop();
  }
  loop = () => {
    const { config = {} } = this.props;
    const rate = parseInt(config.rate, 10) || 10;
    const level = Math.abs(
      Math.sin(
        (Math.round(Date.now() / (rate - 100)) % 360) * ((1 / 180) * Math.PI)
      )
    );
    this.props.updateValue(level);
    this.loopTimer = setTimeout(this.loop, this.interval);
  };
  componentWillUnmount() {
    clearTimeout(this.loopTimer);
  }
  render() {
    const { value } = this.props;
    return (
      <div>
        <span
          style={{
            fontWeight: 800,
            fontSize: 32,
            color: `rgba(255,255,255,${value})`
          }}
          role="img"
          aria-label="Oscillator"
        >
          📶
        </span>
      </div>
    );
  }
}

Oscillator.propTypes = {
  id: PropTypes.string,
  updateValue: PropTypes.func,
  config: PropTypes.object,
  value: PropTypes.any
};

export default {
  name: "Oscillator",
  component: Oscillator,
  category: "Generators",
  inputs: [],
  outputs: [{ id: "level", title: "Ocillator Output", type: "Any" }],
  config: [
    {
      id: "label",
      title: "Label",
      props: {
        type: "text",
        placeholder: "Appears above component"
      }
    },
    {
      id: "rate",
      title: "Rate",
      props: {
        type: "range",
        min: "0",
        max: "99",
        step: "1"
      }
    }
  ]
};
