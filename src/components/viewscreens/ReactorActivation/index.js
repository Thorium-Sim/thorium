import React, { Component } from "react";

export default class ReactorActivation extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(props.viewscreen.data);
    this.looping = false;
    this.state = {
      output: parseFloat(data.startOutput) || 0
    };
  }
  componentDidMount() {
    const data = JSON.parse(this.props.viewscreen.data);
    if (data.activate) {
      this.looping = true;
    }
    this.loop();
  }
  componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.viewscreen.data);
    this.looping = false;
    cancelAnimationFrame(this.frame);
    this.frame = false;
    this.setState(
      state => ({ output: parseFloat(data.startOutput) }),
      () => {
        this.looping = true;
        this.loop();
      }
    );
  }
  loop = () => {
    if (!this.looping) return false;
    const data = JSON.parse(this.props.viewscreen.data);
    if (parseFloat(data.startOutput) > parseFloat(data.endOutput)) {
      if (this.state.output > parseFloat(data.endOutput)) {
        this.setState({
          output: this.state.output - 0.002
        });
      } else {
        cancelAnimationFrame(this.frame);
        this.frame = null;
        return false;
      }
    } else {
      if (this.state.output < parseFloat(data.endOutput)) {
        this.setState({
          output: this.state.output + 0.002
        });
      } else {
        cancelAnimationFrame(this.frame);
        this.frame = null;
        return false;
      }
    }
    this.frame = requestAnimationFrame(this.loop);
  };
  render() {
    return (
      <div style={{ marginTop: "15vh" }}>
        Reactor Output: {Math.round(this.state.output * 1000) / 10}
      </div>
    );
  }
}
