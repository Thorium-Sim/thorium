import React, { Component } from "react";

export default class Downloading extends Component {
  getSpacedRandomArray = function(layers, space, minPX, maxPX) {
    var arr = [0];
    var output = [];
    var minSize = 5,
      maxSize = 30;
    var increment = 0;

    // Generate base array
    for (var layer = 0; layer < layers; layer++) {
      increment += Math.floor(minSize + maxSize * Math.random());
      arr.push(increment);
      increment += space;
      arr.push(increment);
    }

    // Adjust min and max
    var finalValue = arr[arr.length - 1];
    for (var i = 0; i < arr.length; i++) {
      var value = arr[i];
      output.push(minPX + (maxPX - minPX) / finalValue * value);
    }

    return output;
  };

  setup = function() {
    let canvas = this.refs.starCanvas;
    let height = window.innerHeight;
    let width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;

    this.width = width;
    this.height = height;
    this.xC = width / 2;
    this.yC = height / 2;
    this.ctx = canvas.getContext("2d");

    this.stepCount = 0;
    this.maxPop = 10;
    this.particles = [];
    this.stars = [];
    this.croissants = [];
    this.croissantsBirth();
  };
  update = function() {
    this.stepCount++;
    if (this.stepCount % 50 === 0 && this.particles.length < this.maxPop)
      this.birth();
    if (this.stepCount % 10 === 0) this.starBirth();

    this.move();

    this.draw();
  };
  birth = function() {
    var ang = 2 * Math.PI * Math.random();
    var rad = 30 + 200 * Math.random();

    var x = this.xC + rad * Math.cos(ang);
    var y = this.yC + rad * Math.sin(ang);

    var particle = {
      x: x,
      y: y,
      xSpeed: 0,
      ySpeed: 0,
      r: rad,
      rSpeed: 0.02 * Math.random(),
      angle: ang,
      angleSpeed: 0.2 * Math.random(),
      size: 3 + 10 * Math.random()
    };
    this.particles.push(particle);
  };
  starBirth = function() {
    var star = {
      r: Math.max(this.height, this.width) * 2,
      angle: 2 * Math.PI * Math.random()
    };
    this.stars.push(star);
  };
  croissantsBirth = function() {
    let croissantsBase = this.getSpacedRandomArray(5, 10, 150, 250);
    for (let c = 0; c < croissantsBase.length / 2; c++) {
      let croissant = {
        innerRad: croissantsBase[2 * c],
        outerRad: croissantsBase[2 * c + 1],
        span: Math.PI * (0.2 + 1 * Math.random()),
        angle: 0,
        angleSpeed: 0.2 * Math.random(),
        hue: 180 + 30 * Math.random()
      };
      this.croissants.push(croissant);
    }
  };
  move = function() {
    // Particles
    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i];
      particle.rSpeed += 0.5 - particle.r / 100;
      particle.r += 0.1 * particle.rSpeed;
      particle.angle += particle.angleSpeed;
      particle.x = this.xC + particle.r * Math.cos(particle.angle);
      particle.y = this.yC + particle.r * Math.sin(particle.angle);
    }
    // Croissants
    for (let k = 0; k < this.croissants.length; k++) {
      let croissant = this.croissants[k];
      croissant.angle -= croissant.angleSpeed;
    }
    // Stars
    for (let j = 0; j < this.stars.length; j++) {
      let star = this.stars[j];
      star.r -= (star.r - 30) / 40;
    }
  };
  draw = function() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw stars
    for (let j = 0; j < this.stars.length; j++) {
      let star = this.stars[j];
      this.ctx.beginPath();
      this.ctx.arc(
        this.xC + star.r * Math.cos(star.angle),
        this.yC + star.r * Math.sin(star.angle),
        Math.floor((star.r - 30) / 10),
        0,
        2 * Math.PI,
        true
      );
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      this.ctx.fill();
    }

    // Draw croissants
    for (let k = 0; k < this.croissants.length; k++) {
      let croissant = this.croissants[k];
      this.ctx.beginPath();
      let glitch = 0; //Math.random() > 0.9;
      this.ctx.arc(
        this.xC,
        this.yC,
        croissant.innerRad,
        croissant.angle,
        croissant.angle + croissant.span,
        glitch
      );
      this.ctx.strokeStyle = this.ctx.shadowColor =
        "hsla(" + croissant.hue + ", 80%, 40%, 0.8)";
      this.ctx.shadowBlur = 20;
      this.ctx.lineWidth = croissant.outerRad - croissant.innerRad;
      this.ctx.stroke();
    }

    // Draw particles
    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i];

      this.ctx.beginPath();
      this.ctx.moveTo(this.xC, this.yC);
      this.ctx.lineWidth = 0.5;
      this.ctx.lineTo(particle.x, particle.y);
      this.ctx.strokeStyle = "hsl(200, 80%, 60%)";
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = "hsl(200, 80%, 60%)";
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(
        particle.x,
        particle.y,
        Math.abs(particle.r) / 10,
        0,
        2 * Math.PI,
        true
      );
      this.ctx.lineWidth = 2;
      this.ctx.fillStyle = "black";
      this.ctx.stroke();
      this.ctx.fill();
    }
  };
  frame = () => {
    if (!this.animating) return;
    this.update();
    window.requestAnimationFrame(this.frame);
  };
  componentDidMount() {
    this.animating = true;
    this.setup();
    this.frame();
  }
  componentWillUnmount() {
    this.animating = false;
  }
  render() {
    return (
      <div>
        <h1
          style={{
            fontSize: "60px",
            textAlign: "center",
            marginTop: "80px",
            position: "absolute",
            zIndex: 10,
            left: 0,
            right: 0
          }}
        >
          Downloading
        </h1>
        <canvas
          ref="starCanvas"
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        />
      </div>
    );
  }
}
