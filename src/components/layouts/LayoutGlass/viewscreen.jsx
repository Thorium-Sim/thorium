import React, {Component} from "react";
import Views from "components/views";
import CardFrame from "./frame";
import {withApollo} from "react-apollo";
import "./layout.scss";

class LayoutGlass extends Component {
  state = {};
  render() {
    let {simulator} = this.props;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-glass glass-viewscreen ${alertClass}`}>
        <CardFrame {...this.props} viewscreen>
          <Views.Viewscreen {...this.props} />
        </CardFrame>
      </div>
    );
  }
}

export default withApollo(LayoutGlass);
