import React, { Component } from "react";
import { findDOMNode } from "react-dom";

export default class Beam extends Component {
  draw = () => {
    if (!this.animating) return;
    this.animation = requestAnimationFrame(this.draw);
    const canvas = findDOMNode(this);
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, 400, 200);
    for (let i = 0; i < 200; i++) {
      context.beginPath();
      context.moveTo(400, 0);
      context.lineTo(0, 140 + Math.random() * 100);
      context.strokeStyle = "rgba(50,180,255," + (Math.random() - 0.25) + ")";
      context.stroke();
    }
  };
  componentDidMount() {
    this.animating = true;
    this.draw();
  }
  componentWillUnmount() {
    this.animating = false;
    cancelAnimationFrame(this.animation);
  }
  render() {
    return (
      <canvas
        id="tractorEffect"
        className={this.props.shown ? "shown" : ""}
        width="400"
        height="200"
      />
    );
  }
}
