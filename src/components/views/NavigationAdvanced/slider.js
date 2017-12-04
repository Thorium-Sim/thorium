import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./slider.css";
export default class Slider extends Component {
  static defaultProps = {
    numbers: [4, 3, 2, 1, 0, -1, -2, -3, -4]
  };
  constructor(props) {
    super(props);
    this.state = {
      level: Math.max(
        0,
        props.snap
          ? this.props.defaultLevel || 0.5
          : this.props.defaultLevel || 0
      ),
      dragging: false
    };
  }
  triggerChange = level =>
    this.props.onChange && this.props.onChange(level, this.props.numbers);
  mouseDown = () => {
    if (this.props.disabled) return;
    this.setState({ dragging: true });
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
    this.setState({ dragging: false }, () => {
      if (this.props.snap) {
        this.props.onChange &&
          this.props.onChange(
            this.props.defaultLevel || 0.5,
            this.props.numbers
          );
        this.setState({ level: Math.max(0, this.props.defaultLevel || 0.5) });
      }
    });
  };
  mouseMove = evt => {
    const bounds = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const level = Math.abs(
      Math.min(1, Math.max(0, (evt.clientY - bounds.top) / bounds.height)) - 1
    );
    this.setState({ level: Math.max(0, level) });
    this.triggerChange(level);
  };
  render() {
    return (
      <div className="slider-bar">
        <div className="numbers">
          {this.props.numbers.map(i => (
            <div className="number" key={i}>
              {i}
            </div>
          ))}
        </div>
        <div className="track" />
        <div
          className="slider-wrapper"
          style={{
            transition: `transform ${this.state.dragging ? 0 : 0.2}s ease`,
            transform: `translateY(calc(${Math.abs(this.state.level - 1) *
              100}% - 15px))`
          }}
        >
          <div
            className="slider"
            onMouseDown={this.mouseDown}
            style={this.props.sliderStyle}
          />
        </div>
      </div>
    );
  }
}
