import React, { Component } from "react";

export default class Explosion extends Component {
  state = { frame: 0 };
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    clearTimeout(this.looping);
    this.looping = false;
  }
  loop = () => {
    const { frame } = this.state;
    if (!this.looping) return;
    if (frame === 16) return;
    this.setState({
      frame: frame + 1
    });
    this.looping = setTimeout(this.loop, 50);
  };
  render() {
    const { width = 100, style = {} } = this.props;
    const { frame } = this.state;
    return (
      <img
        width={width}
        alt="explosion"
        draggable={false}
        style={style}
        src={require(`./frame${frame}.png`)}
      />
    );
  }
}
