import React, { Component } from "react";
import Views from "../../views";
import CardFrame from "./frame";
import { withApollo } from "react-apollo";
import "./layout.scss";

class LayoutGlass extends Component {
  state = {};
  render() {
    let { simulator, station, lite } = this.props;
    const { name: stationName } = station;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-glass glass-viewscreen ${alertClass}`}>
        <Views.Viewscreen {...this.props} />
        <div className="frame-text">
          <h1 className="simulator-name">{simulator.name}</h1>
          <h2 className="station-name">{stationName}</h2>
        </div>
        <CardFrame simulator={simulator} viewscreen lite={lite} />
      </div>
    );
  }
}

export default withApollo(LayoutGlass);
