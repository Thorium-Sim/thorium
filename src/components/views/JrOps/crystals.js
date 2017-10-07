import React, { Component } from "react";
import tinycolor from "tinycolor2";

export default () =>
  <div style={{ width: "100%" }}>
    <h1>Energy Crystals</h1>
    <div className="crystals">
      <Crystal bgColor="rebeccapurple" />
      <Crystal bgColor="cyan" />
      <Crystal bgColor="limegreen" />
    </div>
  </div>;

class Crystal extends Component {
  state = {
    level: 1,
    bar1: Math.random(),
    bar2: Math.random(),
    bar3: Math.random(),
    bar4: Math.random(),
    arrowPos: Math.random()
  };
  looping = true;
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.looping);
    this.looping = null;
  }
  mouseDown = () => {
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
  };
  mouseMove = evt => {
    const { movementY } = evt;
    this.setState(state => {
      return {
        arrowPos: Math.min(1, Math.max(0, state.arrowPos + movementY / 100)),
        level: Math.max(0, state.level - 0.005)
      };
    });
  };
  loop = () => {
    if (this.looping) {
      this.setState(
        state => {
          return {
            level: state.level + Math.random() / 5000,
            bar1: Math.min(
              1,
              Math.max(0, state.bar1 + (Math.random() - 0.5) / 50 * state.level)
            ),
            bar2: Math.min(
              1,
              Math.max(0, state.bar2 + (Math.random() - 0.5) / 50 * state.level)
            ),
            bar3: Math.min(
              1,
              Math.max(0, state.bar3 + (Math.random() - 0.5) / 50 * state.level)
            ),
            bar4: Math.min(
              1,
              Math.max(0, state.bar4 + (Math.random() - 0.5) / 50 * state.level)
            )
          };
        },
        () => {
          this.looping = requestAnimationFrame(this.loop);
        }
      );
    }
  };
  render() {
    const { level = 0, bar1, bar2, bar3, bar4, arrowPos } = this.state;
    let color;
    level > 0.8
      ? (color = "red")
      : level > 0.6
        ? (color = "orange")
        : level > 0.4
          ? (color = "yellow")
          : level > 0.2 ? (color = "green") : (color = "transparent");

    return (
      <div className="crystals-holder">
        <div className="arrow-holder">
          <div
            className="arrow"
            onMouseDown={this.mouseDown}
            style={{ transform: `translateY(${arrowPos * 200}%)` }}
          />
        </div>
        <div className="crystal">
          <img src={require("./crystal.png")} draggable="false" />
          <div className="crystal-overlay" style={{ backgroundColor: color }} />
        </div>
        <div className="bars">
          <div
            className="bar"
            style={{
              width: `${bar1 * 100}%`,
              backgroundColor: this.props.bgColor
            }}
          />
          <div
            className="bar"
            style={{
              width: `${bar2 * 100}%`,
              backgroundColor: tinycolor(this.props.bgColor)
                .darken(10)
                .toRgbString()
            }}
          />
          <div
            className="bar"
            style={{
              width: `${bar3 * 100}%`,
              backgroundColor: tinycolor(this.props.bgColor)
                .darken(20)
                .toRgbString()
            }}
          />
          <div
            className="bar"
            style={{
              width: `${bar4 * 100}%`,
              backgroundColor: tinycolor(this.props.bgColor)
                .darken(30)
                .toRgbString()
            }}
          />
        </div>
      </div>
    );
  }
}
