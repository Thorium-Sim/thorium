import React, { Component } from "react";

export default class PowerRouting extends Component {
  constructor(props) {
    super(props);
    this.state = { connections: [] };
    this.generateColors = this.generateColors.bind(this);
    this.colors = this.generateColors();
  }
  generateColors() {
    const colorList = ["red", "green", "blue", "yellow"];
    const height = window.innerHeight;
    const width = window.innerWidth;
    let output = [
      colorList.map((l, index, arr) => ({
        color: l,
        x: 35 * 2,
        y: height / arr.length * index + 35
      }))
    ];

    for (let i = 1; i < 6; i++) {
      let nextLine = Array(8).fill("gray").map((l, index, arr) => ({
        color: l,
        x: width / arr.length * i + 35 * 2,
        y: height / arr.length * index + 35
      }));
      let lineColors = colorList.concat();
      while (lineColors.length > 0) {
        const index = Math.round(Math.random() * 8);
        if (nextLine[index] && nextLine[index].color === "gray") {
          nextLine[index].color = lineColors.pop();
        }
      }
      output.push(nextLine);
    }

    output.push(
      colorList.map((l, index, arr) => ({
        color: l,
        x: width / arr.length * 3 + 35 * 2,
        y: height / arr.length * index + 35
      }))
    );
    return output;
  }
  selectDot(col, row) {
    const oldColor =
      (this.state.selectedCol || this.state.selectedCol === 0) &&
      (this.state.selectedRow || this.state.selectedRow === 0)
        ? this.colors[this.state.selectedCol][this.state.selectedRow]
        : null;
    const selectedColor = this.colors[col][row];
    if (
      selectedColor.color !== "gray" &&
      (col === 0 ||
        (col === this.state.selectedCol + 1 &&
          oldColor.color === selectedColor.color))
    ) {
      this.setState(
        {
          selectedCol: col,
          selectedRow: row,
          connections: this.state.connections.concat(
            oldColor && col !== 0
              ? {
                  fromcol: oldColor.x,
                  tocol: selectedColor.x,
                  fromrow: oldColor.y,
                  torow: selectedColor.y,
                  color: selectedColor.color
                }
              : []
          )
        },
        () => {
          if (this.state.connections.length === 24) {
            this.props.complete && this.props.complete();
          }
        }
      );
    }
  }

  render() {
    const { selectedCol, selectedRow, connections } = this.state;
    return (
      <svg>
        {connections.map(c =>
          <path
            d={`M ${c.fromcol} ${c.fromrow} L ${c.tocol} ${c.torow}`}
            stroke={c.color}
            strokeWidth={3}
          />
        )}
        {this.colors.map((colors, i, colorArr) =>
          colors.map((color, j) =>
            <circle
              cx={color.x}
              cy={color.y}
              r="17"
              fill={color.color}
              onClick={evt => this.selectDot(i, j, evt)}
              stroke={selectedCol === i && selectedRow === j ? "white" : ""}
            />
          )
        )}
      </svg>
    );
  }
}
