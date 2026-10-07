import React, {Component} from "react";

class CardFrame extends Component {
  render() {
    const {simulator, station, viewscreen, clientObj, children} = this.props;
    return (
      <React.Fragment>
        <div
          className="frame-holder"
          style={
            viewscreen
              ? {position: "relative", zIndex: 10, pointerEvents: "none"}
              : undefined
          }
        >
          <div className="frame-text">
            <h1 className="simulator-name">{simulator.name}</h1>
            <h1 className="station-name">{station.name}</h1>
          </div>
          <div className="left-frame" />
          <div className="right-frame" />
        </div>
        {viewscreen && (
          <div
            className="card-area"
            style={{zIndex: !clientObj?.overlay ? 1000 : 1}}
          >
            {children}
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default CardFrame;
