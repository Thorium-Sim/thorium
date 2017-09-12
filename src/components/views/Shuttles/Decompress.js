import React, { Component } from "react";

export default class FizzleFade extends Component {
  constructor(props) {
    super(props);
    this.ctx = null;
    this.pixels = null;
    this.screen_width = props.width || 256;
    this.screen_height = props.height || 256;
    this.frame = 0;
    this.updatePixels = this.updatePixels.bind(this);
  }
  componentDidMount() {
    this.init();
    this.updatePixels();
  }
  componentDidUpdate() {
    this.frame = 0;
    this.updatePixels();
  }
  init() {
    this.ctx = this.refs.framebuffer.getContext("2d");
    this.pixels = this.ctx.createImageData(
      this.screen_width,
      this.screen_height
    );
    if (this.props.on) {
      for (let i = 0; i < this.screen_width; i++) {
        for (let j = 0; j < this.screen_height; j++) {
          this.setPixel(i, j);
        }
      }
      this.ctx.putImageData(this.pixels, 0, 0);
    }
  }
  feistelNet(input) {
    var l = input & 0xff;
    var r = input >> 8;
    for (var i = 0; i < 8; i++) {
      var nl = r;
      var F = ((r * 11 + (r >> 5) + 7 * 127) ^ r) & 0xff;
      r = l ^ F;
      l = nl;
    }
    return ((r << 8) | l) & 0xffff;
  }
  setPixel(x, y) {
    var color = this.props.on ? "255" : "0";
    var offset = x * 4 + y * 4 * this.screen_width;
    this.pixels.data[offset + 3] = color;
    this.pixels.data[offset + 0] = 255;
    this.pixels.data[offset + 1] = 255;
    this.pixels.data[offset + 2] = 255;
  }
  updatePixels() {
    var j = 0;
    if (this.frame < 65536) requestAnimationFrame(this.updatePixels);
    for (j = 0; j < 500; j++) {
      if (this.frame === 65536) break;
      var fn = this.feistelNet(this.frame);
      var x = fn % this.screen_width;
      var y = Math.floor(fn / this.screen_width);
      if (x < this.screen_width && y < this.screen_height) {
        this.setPixel(x, y);
      }
      this.frame++;
    }
    this.ctx.putImageData(this.pixels, 0, 0);
  }
  render() {
    return (
      <div className="fizzlefade">
        <canvas
          ref="framebuffer"
          width={this.screen_width}
          height={this.screen_height}
        />
      </div>
    );
  }
}
