import React, { Component } from "react";
import "./style.css";

export default class ViewscreenOffline extends Component {
  state = { opacity: 1 };
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.toggle = true;
    this.loop();
  }
  componentWillUnmount() {
    this.toggle = false;
  }
  loop = () => {
    if (this.toggle) {
      this.setState({
        opacity: Math.max(Math.random(), 0.5)
      });
      noise(this.ctx);
      requestAnimationFrame(this.loop);
      return;
    }
  };
  render() {
    return (
      <div className="viewscreen-offline">
        <div className="text">
          <h1 style={{ opacity: this.state.opacity }}>
            MAIN VIEW SCREEN OFFLINE
          </h1>
        </div>
        <canvas id="canvas" />
      </div>
    );
  }
}

function noise(ctx) {
  var w = ctx.canvas.width,
    h = ctx.canvas.height,
    idata = ctx.createImageData(w, h),
    buffer32 = new Uint32Array(idata.data.buffer),
    len = buffer32.length,
    i = 0;

  for (; i < len; ) buffer32[i++] = ((255 * Math.random()) | 0) << 24;

  ctx.putImageData(idata, 0, 0);
}
