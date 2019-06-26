import React, { Component } from "react";
import PropTypes from "prop-types";

class Random extends Component {
  componentDidMount() {
    if (this.props.id) this.loop();
  }
  loop = () => {
    const { config = {} } = this.props;
    const rate = parseInt(config.rate, 10) || 30;
    this.props.updateValue(Math.random());
    this.loopTimer = setTimeout(this.loop, rate);
  };
  componentWillUnmount() {
    clearTimeout(this.loopTimer);
  }
  render() {
    return (
      <div>
        <span
          style={{ fontWeight: 800, fontSize: 32 }}
          role="img"
          aria-label="Random"
        >
          🔀
        </span>
      </div>
    );
  }
}

Random.propTypes = {
  id: PropTypes.string,
  config: PropTypes.object,
  updateValue: PropTypes.func
};

export default {
  name: "Random",
  component: Random,
  category: "Generators",
  inputs: [],
  outputs: [{ id: "level", title: "Random Output", type: "Any" }],
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
        placeholder: "Milliseconds",
        type: "number"
      }
    }
  ]
};
