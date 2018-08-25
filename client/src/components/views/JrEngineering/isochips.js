import React, { Component } from "react";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function distance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt(a * a + b * b);
}

const chipX = window.innerWidth - 200;

export default class Isochips extends Component {
  constructor(props) {
    super(props);
    this.state = { chips: this.generateChips() };
    this.mousedown = (evt, chipindex) => {
      document.addEventListener("mouseup", this.mouseup);
      document.addEventListener("mousemove", this.mousemove);
      document.addEventListener("touchend", this.mouseup);
      document.addEventListener("touchmove", this.mousemove);
      this.setState({
        chipindex
      });
    };
    this.mouseup = () => {
      document.removeEventListener("mouseup", this.mouseup);
      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("touchend", this.mouseup);
      document.removeEventListener("touchmove", this.mousemove);
      this.setState({
        chipindex: null
      });
    };
    this.mousemove = evt => {
      this.setState(
        {
          chips: this.state.chips.map((chip, index) => {
            const clientX = evt.clientX || evt.touches[0].clientX;
            const clientY = evt.clientY || evt.touches[0].clientY;
            if (index === this.state.chipindex) {
              if (distance(clientX + 50, clientY, chipX, chip.dy) < 75) {
                return Object.assign({}, chip, {
                  x: chipX - 150,
                  y: chip.dy,
                  connected: true
                });
              }
              return Object.assign({}, chip, {
                x: clientX - 100,
                y: clientY - 50,
                connected: false
              });
            }
            return chip;
          })
        },
        () => {
          if (this.state.chips.filter(c => c.connected).length === 4) {
            this.props.complete();
          }
        }
      );
    };
  }
  generateChips() {
    const chipPos = shuffleArray([0, 1, 2, 3]);
    return Array(4)
      .fill("")
      .map((_item, i) => {
        return {
          x: 100,
          y: window.innerHeight * (i / 4),
          dy: window.innerHeight * (chipPos[i] / 4),
          edges: Array(Math.round(Math.random() * 5) + 3)
            .fill("")
            .map(() => Math.random())
        };
      });
  }
  render() {
    const { chips } = this.state;
    return (
      <svg id="chips" viewBox="0 0 1600 900">
        {chips.map((chip, index) => (
          <g>
            <g
              onMouseDown={evt => this.mousedown(evt, index)}
              onTouchStart={evt => this.mousedown(evt, index)}
              transform={`translate(${chip.x}, ${chip.y})`}
            >
              <path
                d={`M 170 100 L 0 100 L 0 0 ${chip.edges.reduce(
                  (prev, next, index, arr) => {
                    return `${prev} L ${next * 30 + 170} ${(index /
                      arr.length) *
                      100}`;
                  },
                  ""
                )} Z`}
                fill="#118833"
              />
            </g>
            <g transform={`translate(${chipX}, ${chip.dy})`}>
              <path
                d={`M 100 0 ${chip.edges.reduce((prev, next, index, arr) => {
                  return `${prev} L ${next * 30} ${(index / arr.length) * 100}`;
                }, "")} 0 100 100 100 Z`}
                fill="#118833"
              />
            </g>
          </g>
        ))}
      </svg>
    );
  }
}
