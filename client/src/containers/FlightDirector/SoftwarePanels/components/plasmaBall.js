import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import "./plasmaBall.scss";

class PlasmaBall extends Component {
  unmounted = true;
  componentDidMount() {
    const self = this;
    const canvas = findDOMNode(this).querySelector("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "hard-light";

    function randomMax(max) {
      return Math.floor(Math.random() * max);
    }
    function distance(a, b) {
      return ~~Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    const particleBackground = "rgba(0, 0, 0, 0.1)";
    const numParticles = 70;
    const radiusmax = 200;
    const flashfactor = 0;
    const miParticleSize = 150;
    const criticalDistance = 0;
    const colorSet = [
      "Aqua",
      "BlueViolet",
      "CornflowerBlue",
      "DeepPink",
      "Gold",
      "SpringGreen",
      "Tomato"
    ];
    let fillStyle;

    function Particle(ind) {
      this.ind = ind;
      this.x = randomMax(canvas.width);
      this.y = randomMax(canvas.height);
      this.dy = -5 + randomMax(10);
      this.dx = -5 + randomMax(10);
      this.r = randomMax(radiusmax);
      this.color = colorSet[Math.floor(Math.random() * colorSet.length)];
    }

    Particle.prototype.draw = function() {
      this.r =
        this.r > miParticleSize
          ? flashfactor * (Math.log(this.r) / Math.LN10)
          : miParticleSize;
      this.y += this.dy;
      this.x += this.dx;

      for (let i = this.ind + 1; i < particleSystem.particles.length; i++) {
        if (
          distance(this, particleSystem.particles[i]) < criticalDistance &&
          this.color === particleSystem.particles[i].color
        ) {
          this.r = radiusmax;
          particleSystem.particles[i].r = radiusmax;
        }
      }

      if (
        this.y > canvas.height ||
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        (this.dy === 0 && this.dx === 0)
      ) {
        this.x = randomMax(canvas.width);
        this.y = randomMax(canvas.height);
        this.dy = -5 + randomMax(10);
        this.dx = -5 + randomMax(10);
      }

      ctx.beginPath();

      fillStyle = ctx.createRadialGradient(
        this.x,
        this.y,
        this.r * 0.001,
        this.x,
        this.y,
        this.r
      );
      fillStyle.addColorStop(0, this.color);
      fillStyle.addColorStop(1, particleBackground);

      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    };

    function ParticleSystem() {
      ctx.lineWidth = 1;
      this.particles = [];

      for (let i = 0; i < numParticles; i++) {
        this.particles.push(new Particle(i));
      }
    }
    ParticleSystem.prototype.draw = function() {
      this.particles.forEach(function(particle) {
        particle.draw();
      });
    };

    const particleSystem = new ParticleSystem();

    (function animloop() {
      if (self.unmounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particleSystem.draw();

      requestAnimationFrame(animloop);
    })();
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  render() {
    const {
      level = 0,
      color = "#00ff00",
      inputs = [],
      onMouseDown,
      id,
      connecting,
      page
    } = this.props;
    const alpha = level || inputs[0] || 0;
    return (
      <div>
        {page &&
          connecting &&
          inputs.length === 0 && <div className="input" data-component={id} />}
        <div onMouseDown={onMouseDown} className="plasmaBall">
          <div className="canvas-container">
            <canvas style={{ opactiy: alpha }} />
          </div>
        </div>
      </div>
    );
  }
}

export default PlasmaBall;
