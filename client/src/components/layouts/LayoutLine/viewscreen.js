import React, { Component } from "react";
import Views from "components/views";
import CardFrame from "./cardFrame";
import "./style.scss";

class LayoutGlass extends Component {
  state = {};
  render() {
    let { simulator } = this.props;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-line viewscreen ${alertClass}`}>
        <CardFrame {...this.props} viewscreen>
          <Views.Viewscreen {...this.props} />
        </CardFrame>
      </div>
    );
  }
}

export default LayoutGlass;
