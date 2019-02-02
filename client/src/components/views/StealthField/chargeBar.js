import React, { Component } from "react";
import ReactDOM from "react-dom";
import Arrow from "./arrow";
import col from "color";
class ChargeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.value || 0
    };
  }
  componentDidUpdate() {
    const { value = 0 } = this.props;
    if (!this.state.dragging && this.state.level !== value) {
      this.setState({
        level: value
      });
    }
  }
  mouseDown = () => {
    this.setState({
      dragging: true
    });
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("touchmove", this.mouseMove);
    document.addEventListener("touchend", this.mouseUp);
  };
  mouseUp = () => {
    if (this.props.mouseUp) {
      const mouseUpRes = this.props.mouseUp(this.state.level);
      if (mouseUpRes && mouseUpRes.then) {
        mouseUpRes.then(() =>
          this.setState({
            dragging: false
          })
        );
      } else {
        this.setState({
          dragging: false
        });
      }
    }
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchmove", this.mouseMove);
    document.removeEventListener("touchend", this.mouseUp);
  };
  mouseMove = evt => {
    const { invert } = this.props;
    const node = ReactDOM.findDOMNode(this).querySelector(".bar-holder");
    const level = Math.min(
      1,
      Math.max(
        0,
        ((evt.clientY || evt.touches[0].clientY) -
          node.getBoundingClientRect().top) /
          node.getBoundingClientRect().height
      )
    );
    this.setState({
      level: Math.abs((invert ? 1 : 0) - level)
    });
    this.props.mouseMove && this.props.mouseMove(level);
  };
  render() {
    const { level } = this.state;
    const {
      label = "Charge",
      levelMultiply = 20,
      lineLevel = 0.5,
      color = "#0f0",
      levelColor = "yellow",
      invert
    } = this.props;
    return (
      <div className="vertical-chargeBar">
        <div className="bar-holder">
          <div
            className="bar"
            style={{
              background: `linear-gradient(
      to bottom,
      ${color} 0%,
      ${col(color)
        .darken(0.6)
        .toString()} 50%,
      ${col(color)
        .darken(0.8)
        .toString()} 100%
    )`
            }}
          >
            <div
              className="bar-line"
              style={{
                top: `${(invert ? Math.abs(1 - lineLevel) : lineLevel) * 100}%`,
                background: `linear-gradient(
                  to bottom,
                  transparent 0%,
                  ${levelColor} 50%,
                  transparent 100%
                )`
              }}
            />
          </div>
          <Arrow
            alertLevel={this.props.simulator && this.props.simulator.alertLevel}
            level={Math.abs((invert ? 1 : 0) - level)}
            mouseDown={this.mouseDown}
          />
        </div>
        <p>
          {label}: {Math.round(level * levelMultiply)}
        </p>
      </div>
    );
  }
}

export default ChargeBar;
