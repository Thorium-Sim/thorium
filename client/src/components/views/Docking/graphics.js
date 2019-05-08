import React, { Component } from "react";

export const Doors = props => {
  return (
    <div className="docking-graphic">
      <div className={`airlock ${props.transform ? "on" : ""}`}>
        <div className="tri-1" />
        <div className="tri-2" />
        <div className="tri-3" />
        <div className="tri-4" />
        <div className="tri-5" />
        <div className="tri-6" />
        <div className="tri-7" />
        <div className="tri-8" />
        <div className="tri-9" />
        <div className="tri-10" />
        <div className="tri-11" />
        <div className="tri-12" />
      </div>
      <div style={{ marginTop: "100%" }} />
    </div>
  );
};

export const Ramps = props => {
  return (
    <div className="docking-graphic">
      <div className={`ramps ${props.transform ? "on" : ""}`}>
        <div className="background" />
        <div className="floor" />
        <div className="ramp" />
        <div className="left-door" />
        <div className="right-door">
          <div className="handle1" />
          <div className="handle2" />
        </div>
      </div>
    </div>
  );
};

export class Clamps extends Component {
  render() {
    const { transform } = this.props;
    return (
      <div className="docking-graphic">
        <div className={`clamps ${transform ? "on" : ""}`}>
          <div className="xtransform">
            <div className="clamp rightClamp">
              <div className="stem" />
              <div className="branch" />
              <div className="hook" />
            </div>
          </div>
          <div className="leftClamp">
            <div className="xtransform">
              <div className="clamp">
                <div className="stem" />
                <div className="branch" />
                <div className="hook" />
              </div>
            </div>
          </div>
          <div className="bracket">
            <div className="bottom" />
            <div className="left" />
            <div className="right" />
            <div className="left-brack" />
            <div className="right-brack" />
          </div>
        </div>
      </div>
    );
  }
}

export const Legs = props => {
  return (
    <div className="docking-graphic">
      <div className={`legs ${props.transform ? "on" : ""}`}>
        <div className="tri-1" />
        <div className="tri-2" />
        <div className="tri-3" />
        <div className="tri-4" />
        <div className="tri-5" />
        <div className="tri-6" />
        <div className="tri-7" />
        <div className="tri-8" />
        <div className="tri-9" />
        <div className="tri-10" />
        <div className="tri-11" />
        <div className="tri-12" />
      </div>
      <div style={{ marginTop: "100%" }} />
    </div>
  );
};