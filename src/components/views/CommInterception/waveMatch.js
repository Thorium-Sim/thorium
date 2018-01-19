import React, { Component } from "react";

export default class WaveMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 0,
      frequencyA: Math.round(Math.random() * 20) / 2,
      offsetDownA: 10 - Math.round(Math.random() * 20) / 2,
      offsetUpA: 10 + Math.round(Math.random() * 20) / 2,
      offsetDownB: 10 - Math.round(Math.random() * 20) / 2,
      offsetUpB: 10 + Math.round(Math.random() * 20) / 2,
      frequencyB: Math.round(Math.random() * 20) / 2
    };
    const maxDown = Math.max(this.state.offsetDownA, this.state.offsetDownB);
    const minUp = Math.min(this.state.offsetUpA, this.state.offsetUpB);
    this.state.required = Math.round(
      maxDown + Math.random() * (minUp - maxDown)
    );
    this.loop = () => {
      requestAnimationFrame(this.loop);
      this.setState({ phase: this.state.phase + 2 });
    };
    this.loop();
  }

  render() {
    return (
      <div>
        <svg width={200} height={200}>
          <path
            stroke="red"
            opacity="0.5"
            fill="transparent"
            strokeWidth="2"
            d={calculateSin(
              200,
              200,
              this.state.frequencyA,
              Math.abs(this.state.frequencyA - this.state.required),
              this.state.phase
            )}
          />
          <path
            stroke="blue"
            opacity="0.5"
            fill="transparent"
            strokeWidth="2"
            d={calculateSin(
              200,
              200,
              this.state.frequencyB,
              Math.abs(this.state.frequencyB - this.state.required),
              this.state.phase
            )}
          />
        </svg>
        <input
          type="range"
          min={this.state.offsetDownA}
          max={this.state.offsetUpA}
          step="0.5"
          value={this.state.frequencyA}
          onChange={e => this.setState({ frequencyA: e.target.value })}
        />

        <input
          type="range"
          min={this.state.offsetDownB}
          max={this.state.offsetUpB}
          step="0.5"
          value={this.state.frequencyB}
          onChange={e => this.setState({ frequencyB: e.target.value })}
        />
        <div>{this.state.required}</div>
        <div>{this.state.frequencyA}</div>
        <div>{this.state.offsetDownA}</div>
        <div>{this.state.offsetUpA}</div>
        <div>{this.state.frequencyB}</div>
      </div>
    );
  }
}

function calculateSin(width, height, freq, variance, phase) {
  return Array(width)
    .fill(0)
    .map((_, i) =>
      Math.sin(
        Math.PI * 1 / 180 * (i + phase) * freq + Math.random() * variance
      )
    )
    .reduce((prev, next, i) => {
      return `${prev}L ${i} ${next * height / 2.1 + height / 2} `;
    }, `M 0 ${height / 2} `);
}
