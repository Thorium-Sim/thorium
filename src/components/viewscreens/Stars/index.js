import React, { Component } from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };

const fov = 300;
const starHolderCount = 1000;
const starHolder = [];
const starBgHolder = [];
const starSpeedMin = 1;
const starSpeedMax = 100;
const starDistance = 8000;

const SPEEDCHANGE_SUB = gql`
  subscription SpeedChanged($simulatorId: ID) {
    engineUpdate(simulatorId: $simulatorId) {
      id
      speed
      on
    }
  }
`;

class Stars extends Component {
  currentSpeed = 0;
  starSpeed = null;
  setSpeedSubscription = null;
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  componentWillReceiveProps(nextProps) {
    if (!this.setSpeedSubscription && !nextProps.data.loading) {
      this.setSpeedSubscription = nextProps.data.subscribeToMore({
        document: SPEEDCHANGE_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const engines = previousResult.engines.map(engine => {
            if (engine.id === subscriptionData.data.engineUpdate.id) {
              return Object.assign({}, engine, {
                speed: subscriptionData.data.engineUpdate.speed,
                on: subscriptionData.data.engineUpdate.on
              });
            }
            return engine;
          });
          return Object.assign({}, previousResult, { engines });
        }
      });
    }
    // Only load the canvas if we have the data
    if (!nextProps.data.loading) {
      const { engines } = nextProps.data;
      if (!engines) return;
      const engine = engines.find(e => e.on === true);
      if (!engine) {
        this.currentSpeed = 0;
      }
      // First set of engines (impulse) sets the speed between 1 and 25
      if (engines.findIndex(e => e.on === true) === 0) {
        this.currentSpeed = engine.speed / engine.speeds.length * 25;
      }

      // Second set of engines (warp) sets the speed between 26 and 100
      if (engines.findIndex(e => e.on === true) === 1) {
        this.currentSpeed = engine.speed / engine.speeds.length * 75 + 25;
      }
      if (this.starSpeed === null) {
        this.starSpeed = this.currentSpeed;
      }
    }
    if (this.props.data.loading && !nextProps.data.loading) {
      this.canvas = ReactDOM.findDOMNode(this);
      this.canvas.setAttribute("width", this.canvasWidth);
      this.canvas.setAttribute("height", this.canvasHeight);
      this.ctx = this.canvas.getContext("2d");
      this.imageData = this.ctx.getImageData(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      this.pix = this.imageData.data;
      this.looping = true;
      this.addParticles();
      this.animloop();
    }
  }
  componentWillUnmount() {
    this.setSpeedSubscription && this.setSpeedSubscription();
    cancelAnimationFrame(this.looping);
    this.looping = false;
  }
  clearImageData = () => {
    for (let i = 0, l = this.pix.length; i < l; i += 4) {
      this.pix[i] = backgroundColor.r;
      this.pix[i + 1] = backgroundColor.g;
      this.pix[i + 2] = backgroundColor.b;
      this.pix[i + 3] = backgroundColor.a;
    }
  };
  setPixel = (x, y, r, g, b, a) => {
    const i = (x + y * this.canvasWidth) * 4;

    this.pix[i] = r;
    this.pix[i + 1] = g;
    this.pix[i + 2] = b;
    this.pix[i + 3] = a;
  };
  setPixelAdditive = (x, y, r, g, b, a) => {
    var i = (x + y * this.canvasWidth) * 4;

    this.pix[i] = this.pix[i] + r;
    this.pix[i + 1] = this.pix[i + 1] + g;
    this.pix[i + 2] = this.pix[i + 2] + b;
    this.pix[i + 3] = a;
  };
  drawLine = (x1, y1, x2, y2, r, g, b, a) => {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;

    let err = dx - dy;

    let lx = x1;
    let ly = y1;

    while (true) {
      if (lx > 0 && lx < this.canvasWidth && ly > 0 && ly < this.canvasHeight) {
        this.setPixel(lx, ly, r, g, b, a);
      }

      if (lx === x2 && ly === y2) break;

      const e2 = 2 * err;

      if (e2 > -dx) {
        err -= dy;
        lx += sx;
      }

      if (e2 < dy) {
        err += dx;
        ly += sy;
      }
    }
  };
  addParticle = (x, y, z, ox, oy, oz) => {
    const particle = {};
    particle.x = x;
    particle.y = y;
    particle.z = z;
    particle.ox = ox;
    particle.oy = oy;
    particle.x2d = 0;
    particle.y2d = 0;

    return particle;
  };
  addParticles = () => {
    var i;

    var x, y, z;

    var colorValue;
    var particle;

    for (i = 0; i < starHolderCount / 3; i++) {
      x = Math.random() * 24000 - 12000;
      y = Math.random() * 4500 - 2250;
      z = Math.round(Math.random() * starDistance); //Math.random() * 700 - 350;

      colorValue = Math.floor(Math.random() * 120) + 5;

      particle = this.addParticle(x, y, z, x, y, z);
      particle.color = { r: colorValue, g: colorValue, b: colorValue, a: 255 };

      starBgHolder.push(particle);
    }

    for (i = 0; i < starHolderCount; i++) {
      x = Math.random() * 10000 - 5000;
      y = Math.random() * 10000 - 5000;
      z = Math.round(Math.random() * starDistance); //Math.random() * 700 - 350;

      colorValue = Math.floor(Math.random() * 255) + 100;

      particle = this.addParticle(x, y, z, x, y, z);
      particle.color = { r: colorValue, g: colorValue, b: colorValue, a: 255 };
      particle.oColor = { r: colorValue, g: colorValue, b: colorValue, a: 255 };
      particle.w = 1;
      particle.distance = starDistance - z;
      particle.distanceTotal = Math.round(starDistance + fov - particle.w);

      starHolder.push(particle);
    }
  };
  animloop = () => {
    if (this.looping) {
      this.looping = requestAnimationFrame(this.animloop);
      this.renderFrame();
    }
  };
  renderFrame = () => {
    this.clearImageData();

    var i, l;

    var star;
    var scale;

    if (this.starSpeed < this.currentSpeed) {
      this.starSpeed += 0.2;

      if (this.starSpeed > starSpeedMax) this.starSpeed = starSpeedMax;
    }
    if (this.starSpeed > this.currentSpeed) {
      this.starSpeed -= 0.5;

      if (this.starSpeed < starSpeedMin) this.starSpeed = starSpeedMin;
    }

    var warpSpeedValue = this.starSpeed * (this.starSpeed / (starSpeedMax / 2));

    for (i = 0, l = starBgHolder.length; i < l; i++) {
      star = starBgHolder[i];

      scale = fov / (fov + star.z);

      star.x2d = star.x * scale + this.center.x;
      star.y2d = star.y * scale + this.center.y;

      if (
        star.x2d > 0 &&
        star.x2d < this.canvasWidth &&
        star.y2d > 0 &&
        star.y2d < this.canvasHeight
      ) {
        this.setPixel(
          star.x2d | 0,
          star.y2d | 0,
          star.color.r,
          star.color.g,
          star.color.b,
          255
        );
      }
    }

    for (i = 0, l = starHolder.length; i < l; i++) {
      star = starHolder[i];

      star.z -= this.starSpeed;
      star.distance += this.starSpeed;

      if (star.z < -fov + star.w) {
        star.z = starDistance;
        star.distance = 0;
      }

      var distancePercent = star.distance / star.distanceTotal;

      star.color.r = Math.floor(star.oColor.r * distancePercent);
      star.color.g = Math.floor(star.oColor.g * distancePercent);
      star.color.b = Math.floor(star.oColor.b * distancePercent);

      scale = fov / (fov + star.z);

      star.x2d = star.x * scale + this.center.x;
      star.y2d = star.y * scale + this.center.y;

      if (
        star.x2d > 0 &&
        star.x2d < this.canvasWidth &&
        star.y2d > 0 &&
        star.y2d < this.canvasHeight
      ) {
        this.setPixelAdditive(
          star.x2d | 0,
          star.y2d | 0,
          star.color.r,
          star.color.g,
          star.color.b,
          255
        );
      }

      if (this.starSpeed !== starSpeedMin) {
        var nz = star.z + warpSpeedValue;

        scale = fov / (fov + nz);

        var x2d = star.x * scale + this.center.x;
        var y2d = star.y * scale + this.center.y;

        if (
          x2d > 0 &&
          x2d < this.canvasWidth &&
          y2d > 0 &&
          y2d < this.canvasHeight
        ) {
          this.drawLine(
            star.x2d | 0,
            star.y2d | 0,
            x2d | 0,
            y2d | 0,
            star.color.r,
            star.color.g,
            star.color.b,
            255
          );
        }
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  };
  render() {
    return (
      <canvas
        style={{ backgroundColor: "black", zIndex: 1, position: "absolute" }}
      />
    );
  }
}

const ENGINE_QUERY = gql`
  query getEngines($simulatorId: ID!) {
    engines(simulatorId: $simulatorId) {
      id
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      speeds {
        text
        number
      }
      heat
      speed
      coolant
      on
    }
  }
`;

export default graphql(ENGINE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(Stars);
