import React, { Component } from "react";
import CardFrame from "./cardFrame";
import Views from "components/views";
import "./style.scss";
import "./buttons.scss";

class LayoutPhoenixViewscreen extends Component {
  state = {};
  render() {
    let { simulator } = this.props;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`phoenix-frame viewscreen ${alertClass}`}>
        <CardFrame {...this.props} />
        <div className="card-area">
          <Views.Viewscreen {...this.props} />
        </div>
      </div>
    );
  }
}
export default LayoutPhoenixViewscreen;
