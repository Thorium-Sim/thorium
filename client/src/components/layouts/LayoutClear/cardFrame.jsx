import React, {Component} from "react";
import bottomLeft from "./images/bottomLeft.png";
import bottomRight from "./images/bottomRight.png";
import topLeft from "./images/topLeft.png";
import topRight from "./images/topRight.png";
import nameBox from "./images/nameBox.svg";

const images = {
  bottomLeft,
  bottomRight,
  topLeft,
  topRight,
  nameBox,
};
class CardFrame extends Component {
  state = {};
  render() {
    let {
      simulator,
      station: {name: stationName},
      children,
      viewscreen,
      clientObj,
    } = this.props;
    let displayAlert = simulator.alertlevel;
    if (simulator.alertlevel === "p") {
      displayAlert = "s";
    }
    return (
      <div className="card-frame">
        <div className="chrome">
          <img
            src={images["bottomLeft"]}
            draggable={false}
            className="bottom-left"
            alt=""
          />
          <img
            src={images["bottomRight"]}
            draggable={false}
            className="bottom-right"
            alt=""
          />
          <img
            src={images["topLeft"]}
            draggable={false}
            className="top-left"
            alt=""
          />

          <img
            src={images["topRight"]}
            draggable={false}
            className="top-right"
            alt=""
          />
          <h1 className="simulator-name">{simulator.name}</h1>
          <h1 className="alert-condition-text">{displayAlert}</h1>
          <div className="alert-condition-indicator" />
          {!viewscreen && (
            <>
              <img
                src={images["nameBox"]}
                draggable={false}
                className="name-box"
                alt=""
              />
              <div
                className="ship-icon-logo"
                style={{
                  backgroundImage: `url('/assets${simulator.assets.logo}')`,
                }}
              />
              <h2 className="station-name">{stationName}</h2>
              <h2 className="login-name">{clientObj.loginName}</h2>
            </>
          )}
        </div>
        <div
          className="card-area"
          style={{zIndex: viewscreen && !clientObj.overlay ? 1000 : 1}}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default CardFrame;
