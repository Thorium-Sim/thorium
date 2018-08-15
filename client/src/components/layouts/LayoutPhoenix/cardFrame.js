import React, { Component } from "react";

class CardFrame extends Component {
  render() {
    const { simulator, station } = this.props;
    const alertLevel = simulator.alertlevel || 5;
    return (
      <div className="frame-holder">
        <div className="frame-text">
          <h1 className="simulator-name">{simulator.name}</h1>
          <h1 className="station-name">{station.name}</h1>
        </div>
        <div className="alert-condition-box">{alertLevel}</div>
        <div className="inner-frame" />
      </div>
    );
  }
}
export default CardFrame;
