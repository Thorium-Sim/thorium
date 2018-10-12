import React, { Component } from "react";

class Interference extends Component {
  state = { opacity: 1 };
  componentDidMount() {
    const canvas = document.getElementById("sensors-interference");
    this.ctx = canvas.getContext("2d");
    canvas.width = this.props.width / 2;
    canvas.height = this.props.width / 2;
    this.toggle = true;
    this.loop();
  }
  componentWillUnmount() {
    this.toggle = false;
    clearTimeout(this.loop);
  }
  loop = () => {
    if (this.toggle) {
      this.noise(this.ctx);
      setTimeout(this.loop, 1000 / 30);
      return;
    }
  };
  noise(ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    if (w === 0 || h === 0) return;
    const idata = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;
    let i = 0;

    for (; i < len; ) buffer32[i++] = ((255 * Math.random()) | 0) << 24;

    ctx.putImageData(idata, 0, 0);
  }

  render() {
    const { interference } = this.props;
    return (
      <div
        className="sensors-interference"
        style={{
          opacity: interference,
          pointerEvents: interference > 0.5 ? "all" : "none"
        }}
      >
        <canvas id="sensors-interference" />
      </div>
    );
  }
}
export default Interference;
