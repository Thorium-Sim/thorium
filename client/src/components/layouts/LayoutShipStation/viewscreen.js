import React, { Component } from "react";
import Views from "../../views";
import CardFrame from "./cardFrame";
import "./style.scss";

class LayoutShipStationViewscreen extends Component {
  state = {};
  render() {
    let { simulator } = this.props;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-ship-station viewscreen ${alertClass}`}>
        <CardFrame {...this.props} viewscreen>
          <Views.Viewscreen {...this.props} />
        </CardFrame>
      </div>
    );
  }
}

export default LayoutShipStationViewscreen;
