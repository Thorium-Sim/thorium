import React, { Component } from "react";

class SignalLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comm: Array(Math.round(props.width / this.segments))
        .fill(0)
        .map(() => (Math.random() - 0.5) / 100),
      sensors: Array(Math.round(props.width / this.segments))
        .fill(0)
        .map(() => (Math.random() - 0.5) / 100),
      tactical: Array(Math.round(props.width / this.segments))
        .fill(0)
        .map(() => (Math.random() - 0.5) / 100)
    };
  }
  segments = 10;

  updateLines = (lines, type) => {
    const { jammer, width, signals = [], active } = this.props;
    return lines.map((l, i) => {
      let clamp = 0.02;
      let speed = 100;
      if (!active) {
        clamp = 0.005;
        return Math.max(
          clamp * -1,
          Math.min(clamp, l + (Math.random() - 0.5) / speed)
        );
      }
      const perc = i * this.segments / width;
      const signal = signals.find(
        s => s.type === type && s.level + 0.025 > perc && s.level - 0.025 < perc
      );
      if (signal) {
        clamp = signal.power / 2 || 0.5;
        speed = 50;
      }
      if (jammer.level + 0.04 > perc && jammer.level - 0.04 < perc) {
        const level = Math.max(
          0,
          (signal ? signal.power : 0.2) / 2 - jammer.power / 2
        );
        if (Math.abs(l) > level) {
          let dir = 1;
          if (l > 0) dir = -1;
          return Math.max(
            clamp * -1,
            Math.min(clamp, l + Math.random() / 2 * dir / speed)
          );
        }
      }
      return Math.max(
        clamp * -1,
        Math.min(clamp, l + (Math.random() - 0.5) / speed)
      );
    });
  };
  loop = () => {
    if (!this.animating) return;
    this.setState({
      comm: this.updateLines(this.state.comm, "comm"),
      sensors: this.updateLines(this.state.sensors, "sensors"),
      tactical: this.updateLines(this.state.tactical, "tactical")
    });
    this.frame = requestAnimationFrame(this.loop);
  };
  calcLines = (prev, next, i) => {
    return `${prev}L ${(i + 1) * this.segments} ${next * this.props.height +
      this.props.height / 2} `;
  };
  strokeWidth = 2;
  componentDidMount() {
    this.animating = true;
    this.loop();
  }
  componentWillUnmount() {
    this.animating = false;
    cancelAnimationFrame(this.frame);
  }
  render() {
    const { height } = this.props;
    return (
      <div>
        <svg className="signal-lines">
          <path
            stroke="red"
            strokeWidth={this.strokeWidth}
            fill="transparent"
            d={this.state.tactical.reduce(this.calcLines, `M 0 ${height / 2} `)}
          />
          <path
            stroke="#0f0"
            strokeWidth={this.strokeWidth}
            fill="transparent"
            d={this.state.comm.reduce(this.calcLines, `M 0 ${height / 2} `)}
          />
          <path
            stroke="#00f"
            strokeWidth={this.strokeWidth}
            fill="transparent"
            d={this.state.sensors.reduce(this.calcLines, `M 0 ${height / 2} `)}
          />
        </svg>
      </div>
    );
  }
}

export default SignalLines;
