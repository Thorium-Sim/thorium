import React, { Component } from "react";
import "./rotor.css";

function radToDeg(radians) {
  return radians * 180 / Math.PI;
}

class Rotor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.level
    };
  }
  mouseDown = () => {
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
    this.props.update && this.props.update(this.state.level);
  };
  mouseMove = evt => {
    const {
      left,
      top,
      width,
      height
    } = this.refs.innerCircle.getBoundingClientRect();
    const centerX = width / 2 + left;
    const centerY = height / 2 + top;
    const x = evt.clientX - centerX;
    const y = evt.clientY - centerY;
    let rotation = radToDeg(Math.atan(y / x)) + (Math.sign(x) === 1 ? 90 : 270);
    if ((x === 0 && y < 0) || rotation < 0) rotation = 0;

    if (rotation >= 315) rotation = 0;
    else if (rotation >= 270) rotation = 270;
    this.setState({ level: rotation / 270 });
  };
  move = evt => {
    if (evt.target.id === "innerCircle" && this.props.onMouseDown) {
      this.props.onMouseDown(evt);
    }
  };
  render() {
    const {
      id,
      edit,
      page,
      connecting,
      startConnecting,
      scaleComp = () => {},
      scale = 1
    } = this.props;
    const { level } = this.state;
    return (
      <div style={{ transform: `scale(${scale})` }}>
        <div
          className="rotor"
          ref="innerCircle"
          id="innerCircle"
          onMouseDown={this.move}
          style={{ transform: `rotate(${level * 270}deg)` }}
        >
          <div onMouseDown={this.mouseDown} className="center" />
        </div>
        {page &&
          edit &&
          !connecting && (
            <div
              className="output"
              onMouseDown={evt => startConnecting(evt, id)}
            />
          )}
        {page && edit && <div className="scale" onMouseDown={scaleComp} />}
      </div>
    );
  }
}

export default Rotor;
