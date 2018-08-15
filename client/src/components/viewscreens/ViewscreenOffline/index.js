import React, { Component } from "react";
import "./style.scss";

export default class ViewscreenOffline extends Component {
  state = { opacity: 1 };
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth / 4;
    canvas.height = window.innerHeight / 4;
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
      setTimeout(this.loop, 1000 / 30);
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
        <canvas id="canvas" style={{ width: "100vw", height: "100vh" }} />
      </div>
    );
  }
}

function noise(ctx) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const idata = ctx.createImageData(w, h);
  const buffer32 = new Uint32Array(idata.data.buffer);
  const len = buffer32.length;
  let i = 0;

  for (; i < len; ) buffer32[i++] = ((255 * Math.random()) | 0) << 24;

  ctx.putImageData(idata, 0, 0);
}
