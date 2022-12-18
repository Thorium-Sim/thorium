import React, {Component} from "react";
import Views from "@client/cards";
import CardFrame from "./cardFrame";
import "./style.scss";

class LayoutCautionTape extends Component {
  state = {};
  render() {
    let {simulator, station} = this.props;
    const {name: stationName} = station;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-cautiontape viewscreen ${alertClass}`}>
        <div className="frame-text">
          <h1 className="simulator-name">{simulator.name}</h1>
          <h2 className="station-name">{stationName}</h2>
        </div>
        <CardFrame {...this.props} viewscreen>
          <Views.Viewscreen {...this.props} />
        </CardFrame>
      </div>
    );
  }
}

export default LayoutCautionTape;
