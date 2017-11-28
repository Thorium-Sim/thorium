import React, { Component } from "react";

function radToDeg(radians) {
  return radians * 180 / Math.PI;
}

export default class ThrusterRotor extends Component {
  constructor(props) {
    super(props);

    this.state = { rotation: props.rotation || 0 };
  }
  mouseDown = () => {
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
    this.props.onChange && this.props.onChange(this.state.rotation);
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
    if ((x === 0 && y < 0) || rotation >= 359.5) rotation = 0;
    this.setState({
      rotation
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.rotation !== this.props.rotation) {
      this.setState({
        rotation: nextProps.rotation
      });
    }
  }
  render() {
    const { rotation } = this.state;
    const { text, label } = this.props;
    return (
      <div className="thruster-rotor">
        <div className="inner-circle" ref="innerCircle">
          <div className={`angle-box text-${text}`} draggable="false">
            {Math.round(rotation)}˚
          </div>
        </div>
        <div
          className="arrow"
          style={{ "--thruster-rotation": `${rotation}deg` }}
          onMouseDown={this.mouseDown}
        />
        <label>{label}</label>
      </div>
    );
  }
}
