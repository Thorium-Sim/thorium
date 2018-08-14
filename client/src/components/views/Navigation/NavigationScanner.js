import React, { Component } from "react";

class NavigationScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineX: 50,
      lineY: 50,
      backX: 0,
      backY: 0
    };
    this.scanning = null;
    if (props.scanning) {
      this.scanning = setTimeout(this._scan, 100);
    }
  }
  componentDidUpdate(oldProps) {
    if (this.props.scanning && !oldProps.scanning) {
      this.scanning = setTimeout(this._scan, 100);
    }
    if (!this.props.scanning) {
      clearTimeout(this.scanning);
      this.scanning = null;
    }
  }
  componentWillUnmount() {
    clearTimeout(this.scanning);
    this.scanning = null;
  }
  _scan = () => {
    if (this.props.scanning && this.scanning) {
      this.setState({
        lineX: Math.random() * 100,
        lineY: Math.random() * 100,
        backX: (Math.random() - 0.5) * 1000,
        backY: (Math.random() - 0.5) * 1000
      });
      this.scanning = setTimeout(
        this._scan.bind(this),
        Math.random(5000) + 2000
      );
    }
  };
  render() {
    return (
      <div
        className="starsBox"
        style={{
          backgroundPosition: `${this.state.backX}px ${this.state.backY}px`
        }}
      >
        <div className="barVert" style={{ left: `${this.state.lineX}%` }} />
        <div className="barHoriz" style={{ top: `${this.state.lineY}%` }} />
        <div
          className="crosshair"
          style={{
            left: `calc(${this.state.lineX}% - 18px)`,
            top: `calc(${this.state.lineY}% - 18px)`
          }}
        >
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default NavigationScanner;
