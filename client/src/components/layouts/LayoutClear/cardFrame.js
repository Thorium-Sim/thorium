import React, { Component } from "react";

class CardFrame extends Component {
  state = {};
  render() {
    let {
      simulator,
      station: { name: stationName },
      children,
      viewscreen,
      clientObj
    } = this.props;
    return (
      <div className="card-frame">
        <div className="chrome">
          <img
            src={require("./images/bottomLeft.png")}
            draggable={false}
            className="bottom-left"
            alt=""
          />
          <img
            src={require("./images/bottomRight.png")}
            draggable={false}
            className="bottom-right"
            alt=""
          />
          <img
            src={require("./images/topLeft.png")}
            draggable={false}
            className="top-left"
            alt=""
          />

          <img
            src={require("./images/topRight.png")}
            draggable={false}
            className="top-right"
            alt=""
          />
          <h1 className="simulator-name">{simulator.name}</h1>
          <h1 className="alert-condition-text">{simulator.alertlevel}</h1>
          <div className="alert-condition-indicator" />
          {!viewscreen && (
            <>
              <img
                src={require("./images/nameBox.svg")}
                draggable={false}
                className="name-box"
                alt=""
              />
              <div
                className="ship-icon-logo"
                style={{
                  backgroundImage: `url('/assets${simulator.assets.logo}')`
                }}
              />
              <h2 className="station-name">{stationName}</h2>
              <h2 className="login-name">{clientObj.loginName}</h2>
            </>
          )}
        </div>
        <div
          className="card-area"
          style={{ zIndex: viewscreen && !clientObj.overlay ? 1000 : 1 }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default CardFrame;
