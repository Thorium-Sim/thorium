import React, { Component } from "react";

class CardFrame extends Component {
  render() {
    const { simulator, station } = this.props;
    return (
      <div className="frame-holder">
        <div className="frame-text">
          <h1 className="simulator-name">{simulator.name}</h1>
          <h1 className="station-name">{station.name}</h1>
        </div>
        <div className="left-frame" />
        <div className="right-frame" />
      </div>
    );
  }
}
export default CardFrame;
