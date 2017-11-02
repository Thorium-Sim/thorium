import React, { Component } from "react";

const height = 250;
const sinPoints = ({ a, f, p, animate, width }) => {
  let sinWidth = width * 2 * 2;
  if (animate) {
    sinWidth = width / 4 * 2;
  }
  return Array(Math.round(sinWidth))
    .fill(0)
    .map((_, i) => {
      if (animate && i % 2 === 0) return i / 2 + p / 2;
      if (i % 2 === 0) return i / 2;
      let newI = i;
      if (animate) newI += p;
      return Math.sin(newI / 2 / f) * a + height / 2;
    });
};
const decodePoints = ({ message, decodeProgress, ra, rf, width }) => {
  if (!message) return [];
  const newDecodeProgress = width / message.length * 2 * decodeProgress;
  let sinWidth = width / 8 * 2;
  return Array(Math.round(sinWidth))
    .fill(0)
    .map((_, i) => {
      if (i % 2 === 0) return i / 2 + newDecodeProgress / 2;
      const newI = i + newDecodeProgress;
      return Math.sin(newI / 2 / rf) * ra + height / 2;
    });
};

export default class DecodingCanvas extends Component {
  constructor(props) {
    const width = props.dimensions.width;
    super(props);
    this.state = {
      p: width / 2 * -1
    };
    this.looping = true;
  }
  componentDidMount() {
    this.looping = true;
    requestAnimationFrame(this.loop.bind(this));
  }
  componentWillUnmount() {
    this.looping = false;
  }
  loop() {
    if (!this.looping) return;
    const width = this.props.dimensions.width;
    const newP = this.state.p + 20;
    if (newP < width * 2) {
      this.setState({ p: newP });
    } else {
      this.setState({
        p: width / 2 * -1
      });
    }
    // Next frame
    requestAnimationFrame(this.loop.bind(this));
  }
  render() {
    const { p } = this.state;
    const { ra, rf, f, a, message, decodeProgress, dimensions } = this.props;
    console.log(dimensions);
    return (
      <svg
        key={"decoding-line"}
        style={{ height: height, width: dimensions.width }}
      >
        <path
          d={sinPoints({
            f,
            a,
            message,
            width: dimensions.width
          }).reduce(
            (prev, next, index) =>
              prev + `${index % 2 === 0 ? "L" : ""} ${next} `,
            `M 0 ${height / 2} `
          )}
          fill="transparent"
          stroke="red"
          strokeWidth={2}
        />
        <path
          fill="transparent"
          stroke={decodeProgress ? "magenta" : "yellow"}
          strokeWidth={2}
          d={(decodeProgress
            ? decodePoints({
                rf,
                ra,
                message,
                decodeProgress,
                width: dimensions.width
              })
            : sinPoints({
                f: rf,
                a: ra,
                p: p,
                animate: true,
                width: dimensions.width
              })
          ).reduce(
            (prev, next, index) =>
              prev + `${index % 2 === 0 && index !== 0 ? "L" : ""} ${next} `,
            `M `
          )}
        />
      </svg>
    );
  }
}
