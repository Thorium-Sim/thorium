import React, { Component } from "react";

class CardFrame extends Component {
  state = {};
  render() {
    let { children, viewscreen, clientObj } = this.props;
    return (
      <div className="card-frame">
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
