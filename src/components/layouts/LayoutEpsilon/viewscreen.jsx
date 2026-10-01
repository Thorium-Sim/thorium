import React, {Component} from "react";
import CardFrame from "./cardFrame";
import Views from "components/views";
import "./style.scss";

class LayoutEpsilonViewscreen extends Component {
  state = {};
  render() {
    let {simulator} = this.props;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`epsilon-frame viewscreen ${alertClass}`}>
        <CardFrame {...this.props} viewscreen>
          <div className="card-area">
          <Views.Viewscreen {...this.props} />
          </div>
        </CardFrame>
      </div>
    );
  }
}
export default LayoutEpsilonViewscreen;
